import request from 'supertest';
import app from '../app';

jest.mock('../services/rideService', () => ({
  calculateEstimate: jest.fn(() => ({
    id: '1',
    customerId: '123',
    origin: 'Origin',
    destination: 'Destination',
    distance: 10,
    duration: '15 mins',
    price: 25,
  })),
}));

describe('Ride Controller', () => {
  it('should return ride estimate', async () => {
    const response = await request(app).post('/rides/estimate').send({
      customerId: '123',
      origin: 'Origin',
      destination: 'Destination',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      customerId: '123',
      origin: 'Origin',
      destination: 'Destination',
      distance: 10,
      duration: '15 mins',
      price: 25,
    });
  });
});
