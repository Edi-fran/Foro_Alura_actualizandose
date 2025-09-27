// src/tarea.js
export class Tarea {
  constructor({ id, descripcion, completada = false }) {
    this.id = id ?? crypto.randomUUID();
    this.descripcion = descripcion?.trim() ?? "";
    this.completada = Boolean(completada);
    if (!this.descripcion) {
      throw new Error("La descripción de la tarea no puede estar vacía.");
    }
  }
  toggleEstado() { this.completada = !this.completada; }
  toJSON() { return { id: this.id, descripcion: this.descripcion, completada: this.completada }; }
  static fromJSON(obj) { return new Tarea(obj); }
}
