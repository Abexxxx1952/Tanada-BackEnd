<p align="center">
  <a href="tanada-backend.onrender.com/docs" target="blank"><img src="https://github.com/user-attachments/assets/1c09b9bd-60a9-4c78-bcbb-ca553d07dcf9" width="120" alt="Tanada Logo" /></a>
</p>

# Tanada travels blog backEnd 

Backend for a travel website that provides functions for registering and authorizing users, creating and managing photos, maintaining statistics on photos and users. This project is written in NestJS <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="50" alt="Nest Logo" /></a>

## Content

- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Functionality](#functionality)
- [Technologies](#technologies)
- [License](#license)

## Installation

```git clone https://github.com/Abexxxx1952/Tanada-BackEnd.git
cd Tanada-BackEnd
npm install
npm run start:dev   OR   npm run start:prod
```

## Usage

The backend can be used using both REST API and GraphQL.  
REST - https://tanada-backend.onrender.com/api/ <img src="https://github.com/user-attachments/assets/24d15567-6e71-4333-924a-22a3a90fa252" width="40" alt="REST Logo" />  
GraphQL - https://tanada-backend.onrender.com/graphql <img src="https://github.com/user-attachments/assets/58bb1255-72c2-4941-a8c4-c01cf1fc2698" width="40" alt="GraphQl Logo" />  
All information can be found at this link - https://tanada-backend.onrender.com/docs <img src="https://github.com/user-attachments/assets/0df0eb5a-80ef-4b7f-aa51-ddcc007a372f" width="40" alt="Swagger Logo" />  

## Screenshots
<img src="https://github.com/user-attachments/assets/ff53746d-20bb-410d-864f-14c742f95a5b" width="800" alt="screenshot" /><img src="https://github.com/user-attachments/assets/eaefa0d5-7c9a-4449-909a-41e505081678" width="800" alt="screenshot" /><img src="https://github.com/user-attachments/assets/e2120dad-e975-4e3d-afe4-0ea8e78b4b1b" width="800" alt="screenshot" /><img src="https://github.com/user-attachments/assets/d249979e-80b9-41c6-8c28-a2da4aa42c13" width="800" alt="screenshot" /><img src="https://github.com/user-attachments/assets/069a6378-c6b8-479a-a744-ec38b77001cf" width="800" alt="screenshot" /><img src="https://github.com/user-attachments/assets/1df02f56-3c32-4841-bb85-2d40a1ad9668" width="800" alt="screenshot" />

## Functionality

The backend has 3 modules:
1. UsersModule allows you to register a user using both a login and password, and with the help of providers (Google, GitHub). Various types of users searches, editing and deleting a user.
2. PhotoModule allows you to create photos, create SignedUploadUrl. Various types of photos searches, editing and deleting a photo.
3. StatsModule collects statistics on users and photos


## Technologies

The project uses: 
- Graphql <img src="https://github.com/user-attachments/assets/58bb1255-72c2-4941-a8c4-c01cf1fc2698" width="20" alt="GraphQl Logo" />
- Swagger <img src="https://github.com/user-attachments/assets/0df0eb5a-80ef-4b7f-aa51-ddcc007a372f" width="20" alt="Swagger Logo" />
- JWT <img src="https://github.com/user-attachments/assets/7ccedfad-1bec-46e7-90db-240a13ef34c5" width="40" alt="JWT Logo" />
- PassportJS <img src="https://github.com/user-attachments/assets/ffb1bc48-3658-4853-974c-8deb5976ef6f" width="60" alt="PassportJS Logo" />
- TypeOrm <img src="https://github.com/user-attachments/assets/376c8069-dfa6-4b4f-8009-d7d26f9b1396" width="40" alt="TypeOrm Logo" />
- SupeBase as ExternalStorage <img src="https://github.com/user-attachments/assets/111995b6-6b81-4112-aca1-18d29225367f" width="20" alt="SupeBase Logo" />  
others features:
- CORS
- Helmet
- cookieParser
- loggining
- permission by role
- GlobalPipes from NestJS
- ThrottlerModule from NestJS
- CacheModule from NestJS
  
## License

This project is licensed under the MIT License.

