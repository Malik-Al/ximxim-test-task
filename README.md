# Test project for companies ximxim

General information

- Version nodejs v18.14.2
- The configuration is located in the msdata/config directory
- the chronology of static content in the msdata/static directory 



## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.

## Usage

- Run development
``` 
npm run dev
```

- Run prod
```
npm run start
``` 

## Docker command run database
``` 
docker run -d --name my-mysql-v1-container -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=my_db -p 3306:3306 mysql:latest
```

## Contact

For questions, contact me at malikimenov@gmail.com