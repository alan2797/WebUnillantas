# WebSiteFudem

**WebSiteFudem** es una aplicación web para la **gestión médica**, diseñada para facilitar la administración de pacientes, usuarios, constancias médicas, hojas de enfermería y más. La aplicación está construida con **React**, **TypeScript** y **Ant Design**, ofreciendo una interfaz moderna, eficiente y escalable.

---

## Tecnologías utilizadas

* **Frontend:** React, TypeScript, Ant Design
* **Routing:** React Router DOM
* **Bundler:** Vite

---

## Funcionalidades principales

Actualmente, WebSiteFudem permite:

* **Gestión de usuarios:** Crear, editar y administrar usuarios del sistema.
* **Gestión de pacientes:** Registro y seguimiento de información clínica.
* **Constancias médicas:** Generación y administración de certificados médicos.
* **Hojas de enfermería:** Creación y gestión de registros de enfermería.

---

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd websitefudem
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```
3. Configurar el entorno:
    crear el archivo de variables de entorno .env en la raíz del proyecto con el siguiente ejemplo:
   ```bash
    VITE_APP_TITLE=nombreDelProyecto
    VITE_BASE_API=direccion-del-servidor
    VITE_BASE_HREF=/
    NODE_ENV=development    
   ```
4. Iniciar la aplicación:

   ```bash
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:5173` (por defecto de Vite).

---

## Estructura del proyecto

```
websitefudem/
├── public/
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── pages/            # Vistas y páginas principales
│   ├── routes/           # Configuración de rutas
│   ├── services/         # Lógica de conexión con backend
│   ├── hooks/            # Custom hooks
│   └── utils/            # Funciones y utilidades
├── package.json
└── vite.config.ts
```

---

## Licencia

Este proyecto está bajo licencia **MIT**.



