# Mortgage Calculator API Server

TLDR: This is an assesment

## Getting Started

Install depdencies

```bash
npm install
```

## Run

Run development (port 3000):

```bash
npm run dev
```

Run production (port 3000):

```bash
npm run build
npm start
```

Run testing:

```bash
npm run test
```

### Notes

- `Payment Scheduled`: this is for a technical challenge, there might be some things that aren't finished by the time such as `paymentScheduled` which is bi-weekly, accelerated-bi-weekly & monthly. For now this value is received by the server, but is only using the monthly value in the formula.
- `Testing`: to speed up the process this server tests the api using supertest so we endup doing an integration testing.
- `Port`: Important to mention that because this is for development purposes the port will be the `3000`, that way the frontend will have no problems.
- `Code coverage`: For the moment 84% of statements were covered.
