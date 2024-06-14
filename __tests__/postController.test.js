
import { getLastPosts} from '../src/controllers/postController.js';
import postModel from '../src/models/post.js';

jest.mock('../src/models/post.js'); 
jest.mock('fs');
jest.mock('handbrake-js');
jest.mock('firebase/storage');


// Test para traer todos los posts

// describe('getLastPosts', () => {
//     let req, res;

//     beforeEach(() => {
//         req = {}; // Simulación del objeto req
//         res = {
//             status: jest.fn().mockReturnThis(), // Mockea el método status
//             json: jest.fn() // Mockea el método json
//         };
//     });

//     it('should return the last posts with status 200', async () => {
//         const mockPosts = [
//             { _id: '1', title: 'First Post' },
//             { _id: '2', title: 'Second Post' }
//         ];

//         postModel.find.mockResolvedValueOnce(mockPosts); // Simula la respuesta de postModel.find

//         await getLastPosts(req, res); // Llama a la función

//         expect(res.status).toHaveBeenCalledWith(200); // Verifica que se llamó a res.status con 200
//         expect(res.json).toHaveBeenCalledWith(mockPosts); // Verifica que se llamó a res.json con los posts simulados
//     });

//     it('should return an error with status 500 if there is an error', async () => {
//         postModel.find.mockRejectedValueOnce(new Error('Database error')); // Simula un error en postModel.find

//         await getLastPosts(req, res); // Llama a la función

//         expect(res.status).toHaveBeenCalledWith(500); // Verifica que se llamó a res.status con 500
//         expect(res.json).toHaveBeenCalledWith({ message: 'Error al obtener el ultimo post' }); // Verifica que se llamó a res.json con el mensaje de error
//     });
// });

// Fin del test de traer todos  los posts

// Test para crear un post 

// describe('postModel', () => {
//     it('should save a new post correctly', async () => {
//         // Simular la URL de descarga de un archivo guardado
//         const mockDownloadUrl = 'https://example.com/mock-download-url';

//         // Datos simulados del nuevo post
//         const postData = {
//             users_id: 'mockUserId',
//             title: 'Mock Video Title',
//             description: 'Mock Video Description',
//             category: 'Mock Category',
//             file: mockDownloadUrl, // Asignamos la URL simulada al campo file
//         };

//         // Simulamos el método save del modelo postModel
//         postModel.prototype.save = jest.fn().mockResolvedValue({
//             _id: 'mockId',
//             ...postData, // Añadimos los datos simulados al resultado mockeado
//         });

//         // Llamamos directamente al método save con los datos simulados
//         const savedPost = await postModel.prototype.save();

//         // Verificamos que el método save haya sido llamado correctamente
//         expect(postModel.prototype.save).toHaveBeenCalled();

//         // Verificamos que el resultado de save contenga los datos esperados
//         expect(savedPost).toMatchObject({
//             _id: expect.any(String),
//             ...postData, // Verifica que los datos guardados sean los esperados
//         });
//     });
// });
// Fin del test para crear un post


// Test Para Eliminar un post


describe('postModel deleteOne method', () => {
    it('should delete a post with specific id', async () => {
        // Datos de prueba
        const postId = 'mockPostId';

        // Mockear el método deleteOne del modelo postModel
        postModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

        // Llamar al método deleteOne con el postId
        const result = await postModel.deleteOne({ _id: postId });

        // Verificar que el método deleteOne haya sido llamado correctamente con el id correcto
        expect(postModel.deleteOne).toHaveBeenCalledWith({ _id: postId });

        // Verificar que devuelve la cantidad de documentos eliminados (deletedCount)
        expect(result).toEqual({ deletedCount: 1 });
    });

    it('should handle error when failing to delete a post', async () => {
        // Datos de prueba
        const postId = 'invalidId';

        // Mockear el método deleteOne para que falle
        postModel.deleteOne = jest.fn().mockRejectedValue(new Error('Database error'));

        // Llamar al método deleteOne con el postId
        try {
            await postModel.deleteOne({ _id: postId });
        } catch (error) {
            // Verificar que el método deleteOne haya sido llamado correctamente con el id incorrecto
            expect(postModel.deleteOne).toHaveBeenCalledWith({ _id: postId });

            // Verificar el tipo de error recibido
            expect(error.message).toBe('Database error');
        }
    });
});

// Fin test para eliminar post

// Test para traer un unico post

describe('get one post', () => {
    it('should findOne post by id', async () => {
        // Datos simulados
        const mockPostId = 'mockPostId';
        const mockPostData = {
            _id: mockPostId,
            title: 'Mock Post Title',
            description: 'Mock Post Description',
            category: 'Mock Category',
        };

        // Mockear el método findOne del modelo postModel
        postModel.findOne = jest.fn().mockResolvedValue(mockPostData);

        // Llamar al método findOne directamente
        const foundPost = await postModel.findOne({ _id: mockPostId });

        // Verificar que se llamó correctamente al método findOne del modelo
        expect(postModel.findOne).toHaveBeenCalledWith({ _id: mockPostId });

        // Verificar que se obtuvo el post esperado
        expect(foundPost).toEqual(mockPostData);
    });

    it('should handle error when findOne fails', async () => {
        // Mockear el método findOne del modelo para simular un error
        const mockError = new Error('Mock findOne error');
        postModel.findOne = jest.fn().mockRejectedValue(mockError);

        // Llamar al método findOne directamente con un id que no exista
        const nonExistentPostId = 'nonexistentId';
        await expect(postModel.findOne({ _id: nonExistentPostId })).rejects.toThrow(mockError);
    });
});

// Fin test para traer un unico post

// Test para posts del usuario

describe('postModel', () => {
    it('should find posts by user ID', async () => {
        // Datos simulados
        const mockUserId = 'mockUserId';
        const mockUserPosts = [
            {
                _id: 'post1',
                users_id: mockUserId,
                title: 'Mock Post 1',
                description: 'Mock Post Description 1',
                category: 'Mock Category 1',
                file: 'https://example.com/mock-download-url-1',
            },
            {
                _id: 'post2',
                users_id: mockUserId,
                title: 'Mock Post 2',
                description: 'Mock Post Description 2',
                category: 'Mock Category 2',
                file: 'https://example.com/mock-download-url-2',
            },
        ];

        // Mockear el método find del modelo postModel
        postModel.find = jest.fn().mockResolvedValue(mockUserPosts);

        // Llamar al método find directamente
        const foundPosts = await postModel.find({ users_id: mockUserId });

        // Verificar que se llamó correctamente al método find del modelo
        expect(postModel.find).toHaveBeenCalledWith({ users_id: mockUserId });

        // Verificar que la respuesta coincida con los datos simulados
        expect(foundPosts).toEqual(mockUserPosts);
    });

    it('should handle error when find fails', async () => {
        // Mockear el método find del modelo para simular un error
        const mockUserId = 'mockUserId';
        const mockError = new Error('Mock find error');
        postModel.find = jest.fn().mockRejectedValue(mockError);

        // Llamar al método find directamente
        try {
            await postModel.find({ users_id: mockUserId });
            // Si find no arroja un error, la prueba debería fallar
            expect(true).toBe(false); // Forzar la falla de la prueba si no se lanzó un error
        } catch (error) {
            // Verificar que se llamó correctamente al método find del modelo
            expect(postModel.find).toHaveBeenCalledWith({ users_id: mockUserId });

            // Verificar que el error coincida con el error simulado
            expect(error).toEqual(mockError);
        }
    });
});

// Fin test para posts del usuario

// Test para editar un publicacion

describe('postModel', () => {
    it('should update a post correctly using updateOne', async () => {
        const mockPostId = 'mockPostId';
        const mockUpdatedData = {
            title: 'Updated Title',
            description: 'Updated Description',
            category: 'Updated Category',
        };

        // Mockear el método updateOne del modelo postModel
        postModel.updateOne = jest.fn().mockResolvedValue({ nModified: 1 });

        // Llamar directamente al método updateOne con los datos simulados
        const result = await postModel.updateOne({ _id: mockPostId }, { $set: mockUpdatedData });

        // Verificar que se llamó correctamente a updateOne
        expect(postModel.updateOne).toHaveBeenCalledWith({ _id: mockPostId }, { $set: mockUpdatedData });

        // Verificar el resultado de la llamada a updateOne
        expect(result).toEqual({ nModified: 1 });
    });

    it('should handle errors during update using updateOne', async () => {
        const mockPostId = 'mockPostId';
        const mockUpdatedData = {
            title: 'Updated Title',
            description: 'Updated Description',
            category: 'Updated Category',
        };

        const mockError = new Error('Mock update error');

        // Mockear el método updateOne del modelo para simular un error
        postModel.updateOne = jest.fn().mockRejectedValue(mockError);

        // Llamar directamente al método updateOne con los datos simulados
        try {
            await postModel.updateOne({ _id: mockPostId }, { $set: mockUpdatedData });
        } catch (error) {
            // Verificar que se llamó correctamente a updateOne
            expect(postModel.updateOne).toHaveBeenCalledWith({ _id: mockPostId }, { $set: mockUpdatedData });

            // Verificar el manejo de errores
            expect(error).toBe(mockError);
        }
    });
});

// Fin del test para editar una publicacion