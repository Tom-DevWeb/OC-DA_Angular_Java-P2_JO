![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![RxJS](https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
<br/>
![Static Badge](https://img.shields.io/badge/18.0.3-Angular_version-red)
![Static Badge](https://img.shields.io/badge/20.5.0-ngx_charts-blue)

# 🏅 Project 2 - Develop the front-end using Angular

Here you will find **project 2** of the “Angular/Java Application Developer” training. The objective of this project is to take charge of an Angular project, to manipulate data and to use an Angular library.

## 📖 Table of Contents

- [Project](#-project)
  - [Prerequisites](#prerequisites)
  - [Starting the project](#starting-the-project)
  - [Build the project](#build-the-project)
- [Documentation](#-documentation)
  - [Architecture](#architecture)
  - [Mock Data](#models)
  - [Models](#mock-data)
  - [Library](#library)

## 📁 Project

### Prerequisites

- Fork or Clone this project

- Install your node_modules before starting with `npm install`

### Starting the project

1. Run `ng serve` for start the development server.
2. Navigate to `http://localhost:4200/`.

> [!NOTE]
> The application will automatically reload if you change any of the source files.

### Build the project

Run `ng build` to build the project.

> [!NOTE]
> The build artifacts will be stored in the `dist/` directory.

## 📄 Documentation

### Architecture

The predefined architecture includes (in addition to the default angular architecture) the following:

- `core` folder: contains the business logic (`services` and `models` folders)
- `pages` folder: contains components used for routing
- `shared` folder: contains reusable components

### Mock Data

- `assets/mock/olympic.json` folder: contains the data used in app

### Models

```typescript
//Olympic.ts
class Olympic {
  id!: number;
  country!: string;
  participations!: Participation[];
}
```

```typescript
//Participation.ts
class Participation {
  id!: number;
  year!: number;
  city!: string;
  medalsCount!: number;
  athleteCount!: number;
}
```

### Library

- `ngx-charts` library: for graphics
