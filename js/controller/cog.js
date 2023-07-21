import {map,idmarker} from '../config/peta.js';
import {insertMarkerCOG} from '../controller/marker.js';
import {disposePopover} from '../controller/popup.js';

export function container(id){
    return document.getElementById(id);
}

export function onClick(id,actionfunctionname){
    document.getElementById(id).onclick = actionfunctionname;
}

export function onChange(id,actionfunctionname){
    document.getElementById(id).onchange = function() {actionfunctionname()};
}

export function textFocus(id){
    document.getElementById(id).focus();
}

export function textBlur(id){
    document.getElementById(id).blur();
}

export function getValue(id){
    return document.getElementById(id).value;
}

export function setValue(id,valuecontent){
    return document.getElementById(id).value=valuecontent;
}

export function setInner(id,content){
    document.getElementById(id).innerHTML = content;
}

export function addInner(id,content){
    document.getElementById(id).innerHTML += content;
}

export function addChild(id,tag,classvalue,content){
    let el = document.createElement(tag);
    let classArray = classvalue.split(" ");
    classArray.forEach(setClassValue.bind(null,el));
    el.innerHTML = content;
    document.getElementById(id).appendChild(el);
}

function setClassValue(el,classvalue){
    el.classList.add(classvalue.trim());
}

export function show(id){
    document.getElementById(id).style.display = 'block';
}

export function hide(id){
    document.getElementById(id).style.display = 'none';
}
export function getAllCoordinates(){
    let i=0;
    let sudahhapus=0;
    let pointlist = [];
    let totaldemand=0;
    let Xcog=0;
    let Ycog=0;
    map.getLayers().forEach(layer => {
      if (i !== 0 && sudahhapus === 0) {
        layer.getSource().getFeatures().forEach( feature =>
          {
            let node = {
                id : feature.get('id'),
                name : feature.get('name'),
                volume : feature.get('volume'),
                xy : feature.get('geometry').flatCoordinates,
            }
            pointlist.push(node);
            totaldemand=totaldemand+Number(feature.get('volume'));
            Xcog=Xcog+feature.get('geometry').flatCoordinates[0]*Number(feature.get('volume'));
            Ycog=Ycog+feature.get('geometry').flatCoordinates[1]*Number(feature.get('volume'));
          }
        );
      }
      i++;
    });
    console.log(pointlist);
    let x=Xcog/totaldemand;
    let y=Ycog/totaldemand;
    console.log(x);
    console.log(y);
    insertMarkerCOG(x,y);
    disposePopover();
    hide('hitungcogbutton');
}
