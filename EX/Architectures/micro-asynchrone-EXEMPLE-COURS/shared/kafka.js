const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'monoli-app',
  brokers: ['localhost:9092'] // Important de remettre le port du docker-compose.yml car c'est le port qui est exposé à l'hôte
});

module.exports = kafka;
