import axios from 'axios';
import { expect } from 'chai';

const apiKey = 'fc36f1a2fe31e38f8fe9730cfcad2e06'; // Your Trello API Key
const token = 'ATTAeddc4a79b15153e16fd460b9f5bf5f83858931ad84c567d820ecf5ba53716c6a0241B5B6'; // Your Trello Token
const baseUrl = 'https://api.trello.com/1';

describe('Trello API Tests', function () {
    let boardId;

    // Retrieve organizations
    before(async function () {
        try {
            const orgResponse = await axios.get(`${baseUrl}/members/me/organizations`, {
                params: {
                    key: apiKey,
                    token: token,
                },
            });

            console.log('Organizations:', orgResponse.data);
            this.orgId = orgResponse.data[0]?.id; // Replace with the correct organization ID if needed
        } catch (error) {
            console.error('Error fetching organizations:', error.response ? error.response.data : error.message);
            throw error; // Rethrow the error to fail the test
        }
    });

    // Test: Create a board
    it('should create a board', async function () {
        try {
            const response = await axios.post(`${baseUrl}/boards`, null, {
                params: {
                    name: 'Test Board',
                    key: apiKey,
                    token: token,
                    idOrganization: this.orgId,
                },
            });

            boardId = response.data.id; // Save board ID for later use

            // Assertions
            console.log('Create Board Response:', response.data);
            expect(response.status).to.equal(200);
            expect(response.data.name).to.equal('Test Board');
            expect(response.headers['content-type']).to.include('application/json');
        } catch (error) {
            console.error('Error creating board:', error.response ? error.response.data : error.message);
            throw error; // Rethrow the error to fail the test
        }
    });

    // Test: Get the created board
    it('should get the created board', async function () {
        try {
            const response = await axios.get(`${baseUrl}/boards/${boardId}`, {
                params: {
                    key: apiKey,
                    token: token,
                },
            });

            // Assertions
            console.log('Get Board Response:', response.data);
            expect(response.status).to.equal(200);
            expect(response.data.id).to.equal(boardId);
            expect(response.data.name).to.equal('Test Board');
            expect(response.headers['content-type']).to.include('application/json');
        } catch (error) {
            console.error('Error getting board:', error.response ? error.response.data : error.message);
            throw error; // Rethrow the error to fail the test
        }
    });

    // Test: Update the board name
    it('should update the board name', async function () {
        try {
            const response = await axios.put(`${baseUrl}/boards/${boardId}`, null, {
                params: {
                    name: 'Updated Test Board',
                    key: apiKey,
                    token: token,
                },
            });

            // Assertions
            console.log('Update Board Response:', response.data);
            expect(response.status).to.equal(200);
            expect(response.data.name).to.equal('Updated Test Board');
            expect(response.headers['content-type']).to.include('application/json');
        } catch (error) {
            console.error('Error updating board:', error.response ? error.response.data : error.message);
            throw error; // Rethrow the error to fail the test
        }
    });

    // Test: Delete the board
    it('should delete the board', async function () {
        try {
            const response = await axios.delete(`${baseUrl}/boards/${boardId}`, {
                params: {
                    key: apiKey,
                    token: token,
                },
            });
    
            // Assertions
            expect(response.status).to.equal(200);
            // Check if response data indicates deletion
            expect(response.data).to.have.property('_value').that.is.null;
        } catch (error) {
            console.error('Error deleting board:', error.response ? error.response.data : error.message);
            throw error; // Rethrow the error to fail the test
        }
    });
});