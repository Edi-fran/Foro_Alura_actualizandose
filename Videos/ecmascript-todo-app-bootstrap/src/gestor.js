// src/gestor.js
import { Tarea } from "./tarea.js";
const STORAGE_KEY = "mini_todo_tareas_v1";
export class GestorTareas {
  constructor(tareas = []) {
    this.tareas = tareas.map(t => t instanceof Tarea ? t : new Tarea(t));
  }
  agregar(descripcion) {
    const tarea = new Tarea({ descripcion });
    this.tareas = [tarea, ...this.tareas];
    this.guardar();
    return tarea;
  }
  eliminar(id) { this.tareas = this.tareas.filter(t => t.id !== id); this.guardar(); }
  alternar(id) { const t = this.tareas.find(t => t.id === id); if (t) { t.toggleEstado(); this.guardar(); } }
  borrarCompletadas() { this.tareas = this.tareas.filter(t => !t.completada); this.guardar(); }
  contar() { const total = this.tareas.length; const comp = this.tareas.filter(t=>t.completada).length; return {total, completadas: comp, pendientes: total-comp}; }
  filtrar(tipo="todas") {
    switch(tipo){case "pendientes": return this.tareas.filter(t=>!t.completada);
    case "completadas": return this.tareas.filter(t=>t.completada);
    default: return [...this.tareas];}
  }
  guardar(){localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tareas.map(t=>t.toJSON())));}
  static cargar(){try{const raw=localStorage.getItem(STORAGE_KEY); if(!raw) return new GestorTareas(); return new GestorTareas(JSON.parse(raw).map(Tarea.fromJSON));}catch(e){return new GestorTareas();}}
  async cargarDesdeServidor(url="./public/tareas.json"){try{const r=await fetch(url);const d=await r.json();this.tareas=[...this.tareas,...d.map(Tarea.fromJSON)];this.guardar();}catch(e){console.error(e);}}
}
