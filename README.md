# 🎩 Sombrero Seleccionador Vocacional — UTN FRRE

> *"¡Ah! Otro joven que busca su destino..."*

Juego web narrativo tipo **Sombrero Seleccionador de Harry Potter** para jornadas de orientación vocacional en **UTN FRRE (Resistencia, Chaco)**. Ayuda a adolescentes de 1°/2° año de secundario a descubrir su afinidad con las 5 carreras de la facultad.

## 🎓 Carreras incluidas

| Carrera | Clave interna |
|---|---|
| 💻 Ingeniería en Sistemas de Información | `sistemas` |
| ⚗️ Ingeniería Química | `quimica` |
| ⚙️ Ingeniería Electromecánica | `electromecanica` |
| 🤖 Ingeniería Mecatrónica | `mecatronica` |
| 🌾 Licenciatura en Administración Rural | `administracion_rural` |

## 🚀 Cómo usar

1. **Clonar o descargar** el repositorio
2. Abrir `index.html` en cualquier navegador moderno (doble clic)
3. ✅ No requiere internet · ✅ No requiere servidor · ✅ Funciona offline

## 🃏 Cómo funciona el juego

- **Banco de preguntas**: 28 preguntas, cada una con 4-5 opciones
- **Por partida**: 9 preguntas seleccionadas al azar (no se repiten en la misma partida)
- **Sistema de pesos**: cada opción suma puntos a una o más carreras (`weights`)
- **Resultado**: la carrera con mayor puntaje acumulado + segunda carrera + descripción

## 📁 Estructura del proyecto

```
SombreroSeleccionadorCarreras/
├── index.html      ← App principal (3 pantallas: intro / quiz / resultado)
├── style.css       ← Diseño oscuro estilo Harry Potter (dorado/burdeos)
├── app.js          ← Lógica del juego y estadísticas
└── questions.js    ← Banco de 28 preguntas con pesos por carrera
```

## ✏️ Cómo editar preguntas

Editá únicamente [`questions.js`](questions.js). Cada pregunta tiene esta estructura:

```js
{
  id: "q001",
  text: "Texto de la pregunta",
  options: [
    { text: "Opción A", weights: { sistemas: 2, mecatronica: 1 } },
    { text: "Opción B", weights: { quimica: 3 } },
    // ...
  ]
}
```

## 📊 Estadísticas para orientadores

- Cada resultado se guarda en **localStorage** del navegador
- En la pantalla de resultado, hacer clic en **"Ver estadísticas de todas las partidas"**
- Botón **"Exportar CSV"** para descargar los datos y llevarlos a una planilla

## 🛠️ Posibles mejoras futuras

- [ ] Pantalla de desempate si dos carreras empatan
- [ ] Compartir resultado por WhatsApp (Web Share API)
- [ ] Modo quiosco / auto-reset para tablets en stands
- [ ] Backend Supabase para estadísticas compartidas entre dispositivos
- [x] Agregar imágenes/videos de cada carrera

---

*Desarrollado con Antigravity (Google DeepMind) · Septiembre 2026*