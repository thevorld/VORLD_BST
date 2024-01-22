import request from 'supertest';
import app from '../src/app'; // Adjust the path according to your structure

describe('GET /api/test-error', () => {
  it('should handle the error correctly', async () => {
    const response = await request(app).get('/api/test-error');

    // The response should either be successful or an error
    if (response.status === 200) {
      expect(response.body).toEqual({ message: 'No error occurred' });
    } else {
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
    }
  });
});
