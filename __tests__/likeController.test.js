import { createLike } from '../src/controllers/likesController.js';
import likesModels from "../src/models/likes.js";// Asegúrate de importar tu modelo de likes

describe('Create Like', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        posts_id: '6655ae4bbe4cd6ff262a0899',
        users_id: '664c82a6d123a5554adf26fa'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an error if the user has already liked the post', async () => {
    // Simula que ya existe un like para el usuario y el post proporcionados
    jest.spyOn(likesModels, 'findOne').mockResolvedValueOnce({});

    await createLike(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'El usuario ya ha dado like a este post' });
  });

//   it('should continue if the user has not liked the post yet', async () => {
//     // Simula que no existe ningún like para el usuario y el post proporcionados
//     jest.spyOn(likesModels, 'findOne').mockResolvedValueOnce(null);

//     // También puedes simular otras funciones como newLike.save() y newNotification.save() si lo deseas

//     await createLike(req, res);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({ message: 'Like añadido correctamente', newLike: expect.any(Object) });
//   });

  it('should return a 500 status if an error occurs', async () => {
    // Simula que ocurre un error
    jest.spyOn(likesModels, 'findOne').mockRejectedValueOnce(new Error('Database error'));

    await createLike(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Hubo un error al procesar la solicitud' });
  });
});