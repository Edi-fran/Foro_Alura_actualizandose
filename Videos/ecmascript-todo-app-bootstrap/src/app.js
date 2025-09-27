// src/app.js
import { GestorTareas } from "./gestor.js";
const $ = (s,c=document)=>c.querySelector(s);
const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));
const form=$("#form-tarea"),input=$("#descripcion"),lista=$("#lista"),tpl=$("#tpl-item");
const btnClear=$("#btn-borrar-completadas");
const kpiTotal=$("#kpi-total"),kpiPend=$("#kpi-pendientes"),kpiComp=$("#kpi-completadas"),errorMsg=$("#form-error");
const filterButtons=$$(".btn-group .btn");
let filtroActual="todas"; let gestor=GestorTareas.cargar();
(async()=>{if(gestor.tareas.length===0){await gestor.cargarDesdeServidor("./public/tareas.json");}render();})();
form.addEventListener("submit",ev=>{ev.preventDefault();const t=input.value.trim();if(!t){errorMsg.classList.remove("d-none");return;}errorMsg.classList.add("d-none");gestor.agregar(t);input.value="";render();});
lista.addEventListener("click",ev=>{const li=ev.target.closest("li");if(!li)return;const id=li.dataset.id;if(ev.target.matches(".btn-eliminar")){gestor.eliminar(id);render();}});
lista.addEventListener("change",ev=>{if(!ev.target.matches(".chk"))return;const li=ev.target.closest("li");gestor.alternar(li.dataset.id);render();});
btnClear.addEventListener("click",()=>{gestor.borrarCompletadas();render();});
filterButtons.forEach(btn=>btn.addEventListener("click",()=>{filterButtons.forEach(b=>b.classList.remove("active"));btn.classList.add("active");filtroActual=btn.dataset.filtro;render();}));
function render(){lista.innerHTML="";gestor.filtrar(filtroActual).forEach(t=>{const node=tpl.content.firstElementChild.cloneNode(true);node.dataset.id=t.id;$(".chk",node).checked=t.completada;$(".texto",node).textContent=t.descripcion;if(t.completada) $(".texto",node).classList.add("text-decoration-line-through","text-muted");lista.appendChild(node);});const {total,pendientes,completadas}=gestor.contar();kpiTotal.textContent=`Total: ${total}`;kpiPend.textContent=`Pendientes: ${pendientes}`;kpiComp.textContent=`Completadas: ${completadas}`;}
