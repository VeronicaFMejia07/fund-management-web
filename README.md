# 🏦 Fund Management Web - BTG Inversiones

Esta es una aplicación web moderna diseñada para la gestión de fondos de inversión. Permite a los usuarios suscribirse y cancelar fondos, manteniendo un historial detallado de movimientos y un control de saldo en tiempo real.

## 🚀 Instrucciones de Ejecución

Sigue estos pasos para poner en marcha el proyecto en tu máquina local:

### 1. Clonar el repositorio
Repositorio: https://github.com/VeronicaFMejia07/fund-management-web

```bash
git clone https://github.com/VeronicaFMejia07/fund-management-web
cd fund-management-web
```

### 2. Instalar dependencias
Asegúrate de tener Node.js instalado (v20.x o v22.x (LTS)). Luego ejecuta:
```bash 
npm install
```

### 3. Ejecutar el Servidor de Datos (Backend Mock)
Este proyecto utiliza **json-server** para simular una API REST. En una terminal independiente, ejecuta:
```bash 
npm run api
```
#### Detalles del Servidor:
- **Comando interno:** `json-server --watch db.json --port 3000`
- **URL base:** `http://localhost:3000`
- **Archivo insumo de datos:** `db.json` (ubicado en la raíz del proyecto).


### 4. Ejecutar la Aplicación (Frontend)
En otra terminal, inicia el servidor de desarrollo de Angular:
```bash 
npm start
```
La aplicación estará disponible en `http://localhost:4200`.


## 🧩 Tecnologías y Dependencias
| Tecnología | Propósito / Uso en el Proyecto |
| :--- | :--- |
| **Angular 20** | Framework principal utilizando Standalone Components y Signals para la gestión de estado. |
| **PrimeNG** | Librería de componentes UI para elementos como Dropdowns, Modales y Tablas. |
| **PrimeIcons** | Librería de iconos vectoriales oficial de PrimeNG para elementos visuales y navegación. |
| **RxJS** | Para el manejo de flujos de datos asíncronos y peticiones HTTP. |
| **JSON Server** | Mock backend para persistencia de datos (API REST con soporte para GET, POST, PUT y DELETE). | 
| **SweetAlert2**  | Biblioteca para mostrar alertas y diálogos de confirmación animados y personalizados. |
| **SASS (SCSS)** | Preprocesador para estilos avanzados, variables y anidación bajo metodología BEM. |


## 🎨 Arquitectura y Metodología de Diseño
### Enfoque Mobile First
Diseñado bajo la filosofía Mobile First, priorizando la experiencia en dispositivos móviles y escalando progresivamente hacia pantallas de escritorio mediante Media Queries optimizadas a través de mixins de SCSS.

### Metodologia BEM (Block, Element, Modifier)
Para el desarrollo de los estilos en SASS (SCSS), se implementó la metodología BEM, lo que permite una estructura de clases clara y jerárquica.

### Diseño Atómico (Atomic Design)
El proyecto organiza sus componentes siguiendo principios de diseño atómico (Atoms, Molecules, Organisms), separando la lógica de UI pura de la lógica de negocio.

## 💡 Funcionalidades Clave
- **Validación de Saldo:** El sistema impide suscripciones si el monto mínimo supera el saldo disponible.

- **Historial de transacciones:** Cada acción (Suscripción/Cancelación) genera un registro único con fecha y método de notificación.

- **Estado Reactivo:** Actualización instantánea del saldo y listas de fondos mediante servicios compartidos y señales.

- **Sistema de Notificaciones:** Integración con SweetAlert2 para proporcionar feedback visual inmediato sobre el éxito o error de las acciones del usuario.

