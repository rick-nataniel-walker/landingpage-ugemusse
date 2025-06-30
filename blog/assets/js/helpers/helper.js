var notyf = new Notyf({
    duration:10000,
    position:{x:'right',y:'bottom'},
    dismissible:true,
    className:'toast'
});


function getHeaders() {
    return {"Authorization": `Bearer ${sessionStorage.getItem("token")}`};
}

function saveBlob(blob, fileName) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
};

function startModal(txt,anim = 'wanderingCubes'){
    let animations = {
        rotatingPlane: "rotatingPlane",
        wave: "wave",
        wanderingCubes: "wanderingCubes",
        spinner: "spinner",
        chasingDots: "chasingDots",
        threeBounce: "threeBounce",
        circle: "circle",
        cubeGrid: "cubeGrid",
        fadingCircle: "fadingCircle",
        foldingCube: "foldingCube",
    }
  $('body').loadingModal({
      position: 'auto',
      text: txt,
      color: '#fff',
      opacity: '0.75',
      backgroundColor: 'rgb(0,0,0)',
      animation: animations[anim]
  });
}

function killModal(){
  $('body').loadingModal('destroy');
}


function bootstrapTableFactory(table,toollbar,cols){
  let $table = $('#'+table)

  $(function() {
    $('#'+toollbar).find('select').change(function () {
      $table.bootstrapTable('destroy').bootstrapTable({
        exportDataType: $(this).val(),
        exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'excel', 'pdf'],
        columns: cols
      })
    }).trigger('change')
  })
}


function nonPostAjax(callback,method,route,header= getHeaders(),asyncronous=false) {
  $.ajax({
    type:method,
    headers: header,
    url: route,
    async: asyncronous,
    success:function(data,status) {
      callback(data,status);
    },
    error:function(data, status, error) {
      callback(data,status);
    }
  });
}

/**
 *
 * @param callback
 * @param rawForm
 * @param route
 * @param header
 */

function postAjax(callback,rawForm,route,header= getHeaders()){
  let mForm = new FormData(rawForm);
  $.ajax({
    type:"post",
    url: route,
    headers: header,
    data:mForm,
    processData: false,
    contentType: false,
      success:function(data,status,...args) {
          callback(data,status,...args);
      },
      error: function (jqXHR, status, ...args) {
          callback(jqXHR.responseJSON, status, jqXHR.status, ...args);
      }
  });
}

/**
 *
 * @param callback
 * @param formData
 * @param route
 * @param header
 */
function formDatapostAjax(callback,formData,route,header=getHeaders()){
  $.ajax({
    type: "post",
    url: route,
    data: formData,
    headers: header,
    processData: false,
    contentType: false,
    success:function(data,status,...args) {
      callback(data,status,...args);
    },
      error: function (jqXHR, status, ...args) {
          callback(jqXHR.responseJSON, status, jqXHR.status, ...args);
    }
  });
}

function ajaxResponse(data){
  if(data.status==false) notyf.error(data.msg);
  else {
    notyf.success(data.msg);
    return data.msg;
  }
  return null;
}


function isObject(val) {
    if (val === null) { return false;}
    return ( (typeof val === 'function') || (typeof val === 'object') );
}

function switchVisibilityOn(id) {
  element = document.querySelector("#"+id);
  if(element.classList.contains('hide-component')) element.classList.remove('hide-component');
}
function switchVisibilityOff(id) {
  element = document.querySelector("#"+id);
  if(!element.classList.contains('hide-component')) element.classList.add('hide-component');
}
function copy(field) {
    // Get the text field
    var copyText = document.getElementById(field);

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    notyf.success("copiado!!!");
}
const timeDiff = (target) =>{
    const today = new Date(); // Get current date and time
    const targetDate = new Date(target); // Define the target date

    // Calculate the time difference in milliseconds
    return targetDate.getTime() - today.getTime();
}

/**
 *
 * @param htmlAreaId
 * @param payload
 * @param callback
 * @returns {string|{list: any[], hashMap: {}}}
 */
function tableFiller(htmlAreaId,payload,callback){
    let htmlList = new Array();
    let list = new Array();
    let hashMap = {};
    let rows='';
    let table = document.querySelector("#"+htmlAreaId);
    table.innerHTML="";
    payload.forEach((eachData,index) => {
        htmlList.push(callback(eachData, index,...arguments));
        list.push(eachData);
        hashMap[eachData.id] = eachData;
    });
    for(i=0; i<htmlList.length; i++) rows = rows+htmlList[i];
    if(table===null) return rows;
    table.insertAdjacentHTML('beforeend',rows);
    return {list,hashMap};
}

/**
 *
 * @param payload
 * @param field
 * @returns {{}}
 */
function hashMapFactory(payload,field="id"){
    let hashMap = {};
    payload.forEach((eachData) => {
        hashMap[eachData[field]] = eachData;
    });
    return hashMap;
}

function removeInMap(hashMap, id) {
    delete hashMap[id];
    let list = [];
    let items = Object.entries(hashMap);

    items.forEach(item=>{
        list.push(item[1]);
    });

    return {list,hashMap}
}

function serverHasErrors(serverData,status ='',error='',message="Operação falhou, erro: "){
    let hasErrors = false;
    if(serverData.hasOwnProperty('errors') ) {

        let errors = serverData.errors;
        if(typeof errors==='string'){
            notyf.error(errors);
            return true;
        }
        for (var prop in errors) {
            if (Object.prototype.hasOwnProperty.call(errors, prop)) {
                notyf.error(errors[prop][0]);
                hasErrors=true;
            }
        }

    }else if (status === 'error'){
        error=serverData.statusText??error;
        notyf.error(message+error);
        hasErrors=true;
    }
    return hasErrors;
}

/**
 *
 * @param url
 * @param returnObject
 * @returns {{list: *[], hashMap: {}}}
 */
function fetchData(url,returnObject=true){
    startModal("Por favor, agurade...")
    let hashMap={};
    let list=[];
    nonPostAjax((serverData,status,error)=>{
        if(!serverHasErrors(serverData,status,error)){
            list = serverData.data;
            if(returnObject) hashMap = typeof list =="string"?list:hashMapFactory(list);
        }
        killModal();
    },"get",url);
    return {list,hashMap};
}

/**
 *
 * @param url
 * @param form
 * @param METHOD
 * @returns {{list: *[], hashMap: {}}}
 */
function storeData(url, form, METHOD) {
    return new Promise((resolve, reject) => {
        startModal("Por favor, agurade...", "fadingCircle")
        let list = [];
        let hashMap = null;
        if (typeof window[METHOD] === 'function') {
            window[METHOD]((serverData, status, error) => {
                if (!serverHasErrors(serverData, status, error)) {
                    list.push(serverData.data)
                    hashMap = serverData.data;
                    notyf.success("Efectuado com sucesso")
                }
                killModal();
                resolve({list, hashMap});
            }, form, url);
        } else {
            notyf.error(`Unsupported method ${METHOD}`);
            killModal();
            reject(new Error(`Unsupported method ${METHOD}`));
        }
    });

}

/**
 *
 * @param to
 * @param extention
 * @param openInNewTab
 */
function redirect(to,extention='.html',openInNewTab=false){
    if (openInNewTab) window.open(`${location.origin}/${to}${extention}`, '_blank');
    else location = `${location.origin}/${to}${extention}`
}

function geIdFromUrl(url) {
    // Use a regular expression to match the recipe ID from the URL
    const match = url.match(/\/[a-zA-Z]+\/(\d+)\/[a-zA-Z]+/);

    // Check if there's a match and return the captured ID or null if no match
    return match ? parseInt(match[1], 10) : null;
}

function formatNumberToString(number) {
    let formattedString = number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    formattedString = formattedString.replace('.', ',');
    formattedString = formattedString.replace(',', '.');
    return formattedString;
}
