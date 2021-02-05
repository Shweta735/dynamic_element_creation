let templateId;
let templateType;
let formId;
function dynamicForm(name,template){
   $('#response').empty();
    const br = document.createElement("br");
    const attributeId = document.getElementById(name);
    const form = document.createElement("form"); 
    form.setAttribute('id','dynamicelement');

    const elementType = document.createElement("input"); 
    elementType.setAttribute("type", "text"); 
    elementType.setAttribute("name", "type"); 
    elementType.setAttribute('size', '70')
    elementType.setAttribute("placeholder", "Enter type of the element"); 

    const elementValue = document.createElement("input"); 
    elementValue.setAttribute("type", "text"); 
    elementValue.setAttribute("name", "value"); 
    elementValue.setAttribute('size', '70')
    elementValue.setAttribute("placeholder", "Enter value for the element"); 

    const elementAttributes = document.createElement("input"); 
    elementAttributes.setAttribute("type", "text"); 
    elementAttributes.setAttribute("name", "attributes"); 
    elementAttributes.setAttribute('size', '70')
    elementAttributes.setAttribute("placeholder", "Provide attributes separated by comma like name,id,size"); 

    const attributeValues = document.createElement("input"); 
    attributeValues.setAttribute("type", "text"); 
    attributeValues.setAttribute("name", "attval"); 
    attributeValues.setAttribute('size', '70')
    attributeValues.setAttribute("placeholder", "Provide values corresponding to attributes above separated by comma like name,id,size"); 

    const button = document.createElement("input");
    button.setAttribute('type','button');
    button.setAttribute('id','submit');
    button.setAttribute('value','Submit');

    form.appendChild(br.cloneNode()); 

    form.appendChild(elementType);  
    form.appendChild(br.cloneNode());  
                  
    form.appendChild(elementValue);  
    form.appendChild(br.cloneNode());  
                  
    form.appendChild(elementAttributes);  
    form.appendChild(br.cloneNode());  

    form.appendChild(attributeValues);  
    form.appendChild(br.cloneNode());  
    form.appendChild(br.cloneNode());         
    form.appendChild(button);  
    form.appendChild(br.cloneNode()); 
    attributeId.appendChild(form)
    $('#dynamicelement').on('click','#submit',function(){
    const formData = $("#dynamicelement").serialize();
    $.ajax({
      type : 'POST',
      url : 'api/v1/element/property',
      data : formData,
      success:function(data) {
      $("#response").text('Element created successfully');
      $('#response').css({
        "color": "Green",
        "display": "flex",
        "justify-content": "center",
        "font-size": "larger"
       })
       sessionStorage.setItem('elementId',data)
       const serializedData = JSON.parse(JSON.stringify(jQuery('#dynamicelement').serializeArray()));
       const type = serializedData[0].value
       const value = serializedData[1].value;
       let attributes = serializedData[2].value;
       let attval = serializedData[3].value;
       attributes = attributes ? attributes.includes(',') ? attributes.split(',') : [attributes] : [];
       attval = attval ? attval.includes(',') ? attval.split(',') : [attval] : [];
       templateId = document.getElementById(template);
       templateType && templateId ? templateId.removeChild(templateType) : '';
       templateType = document.createElement(type); 
       templateType.appendChild(document.createTextNode(value)); 
       for(let i= 0;i<attributes.length;i++){ 
         templateType.setAttribute(attributes[i], attval[i])
       }
       templateType.setAttribute('value', value)
       templateId.appendChild(templateType)
      },
      error:function(data) {
        $("#response").text(data.responseText);
        $('#response').css({
          "display": "flex",
          "justify-content": "center",
          "color": "red",
          "font-size": "larger"
        })  
      }
    })
  })
}

function updateDynamicElement(dynamicFormId) { 
  $('#response').empty();
  if(templateId){
    const elementId = Number(sessionStorage.getItem('elementId'));
    $.ajax({
      type : 'GET',
      url : `api/v1/element/property/${elementId}`,
      success:function(data) {
        const { attributeKeys, attributeValues, value , type } = data;
        formId ? formId.innerHTML = '' : '';
        formId = document.getElementById(dynamicFormId); 
        const br = document.createElement("br"); 
        const form = document.createElement("form"); 
        form.setAttribute('id','temp'); 

        const elementValue = document.createElement("input"); 
        elementValue.setAttribute("type", "text");
        elementValue.setAttribute("name", "value");  
        elementValue.setAttribute('size', '70')
        elementValue.setAttribute('value', value); 

        const attributes = document.createElement("input"); 
        attributes.setAttribute("type", "text"); 
        attributes.setAttribute("name", "attributes"); 
        attributes.setAttribute('size', '70')
        attributeKeys.length ? attributes.setAttribute('value', attributeKeys.join(',')) :
          attributes.setAttribute('placeholder', 'Provide attributes separated by comma like name,id,size') ; 
  
        const attributeValue = document.createElement("input"); 
        attributeValue.setAttribute("type", "text"); 
        attributeValue.setAttribute("name", "attval"); 
        attributeValue.setAttribute('size', '70')
        attributeValues.length ? attributeValue.setAttribute('value', attributeValues.join(',')) :
           attributeValue.setAttribute('placeholder', "Provide values corresponding to attributes above separated by comma like name,id,size");

        const button = document.createElement("input");
        button.setAttribute('type','button');
        button.setAttribute('id','submit');
        button.setAttribute('value','Submit');
        form.appendChild(br.cloneNode()); 
                  
        form.appendChild(elementValue);  
        form.appendChild(br.cloneNode());  

        form.appendChild(attributes);  
        form.appendChild(br.cloneNode());  
                  
        form.appendChild(attributeValue);  
        form.appendChild(br.cloneNode());  
        form.appendChild(br.cloneNode()); 
        form.appendChild(button);  
        form.appendChild(br.cloneNode()); 
        formId.appendChild(form)
        $('#temp').on('click','#submit',function(){
          $.ajax({
            type : 'PUT',
            url : `api/v1/element/property/${elementId}`,
            data : $("#temp").serialize(),
            success:function(data) {
              $("#response").text('Successfully changed');
              $('#response').css({
                "color": "Green",
                "display": "flex",
                "justify-content": "center",
                "font-size": "larger"
              })
              const serializedData = JSON.parse(JSON.stringify(jQuery('#temp').serializeArray()));
              const value = serializedData[0].value;
              let attributes = serializedData[1].value;
              let attval = serializedData[2].value;
              attributes = attributes ? attributes.includes(',') ? attributes.split(',') : [attributes] : [];
              attval = attval ? attval.includes(',') ? attval.split(',') : [attval] : [];
              templateId.removeChild(templateType);
              templateType = document.createElement(type); 
              templateType.appendChild(document.createTextNode(value)); 
              for(let i= 0;i<attributes.length;i++){ 
                templateType.setAttribute(attributes[i], attval[i])
              }
              templateType.setAttribute('value', value)
              templateId.appendChild(templateType)
            },
            error:function(data) {
              $("#response").text(data.responseText);
              $('#response').css({
                "display": "flex",
                "justify-content": "center",
                "color": "red",
                "font-size": "larger"
              })  
            }
          })
        })
      },
      error:function(data) {
        $("#response").text(data.responseText);
        $('#response').css({
          "display": "flex",
          "justify-content": "center",
          "color": "red",
          "font-size": "larger"
        })  
      }
    })
  } else {
    $("#response").text('Please create an element first');
    $('#response').css({
      "display": "flex",
      "justify-content": "center",
      "color": "red",
      "font-size": "larger"
    }) 
  }
} 