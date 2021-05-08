const {nanoid} = require('nanoid');
const notes = require('./notes');

/*
 * Handler untuk menambah notes
*/
const addNotHandler = (request, h) => {
    const {title, tags, body} = request.payload;

    const id = nanoid(10);
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;

    const newNotes = {
        title, tags, body, id, createdAt, updateAt,
    };

    notes.push(newNotes);
    // eslint-disable-next-line no-trailing-spaces
    
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

/*
 * Handler untuk menampilkan selurh notes di home
*/

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

/*
 * Handler untuk menampilkan detail notes
*/

const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
   
    const note = notes.filter((n) => n.id === id)[0];
   
   if (note !== undefined) {
      return {
        status: 'success',
        data: {
          note,
        },
      };
    }
   
    const response = h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
  };

/*
 * Handler untuk menampilkan notes
*/

const editNoteByIdHandler = (request, h) => {
    const {id} = request.params;
   
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();
   
    const index = notes.findIndex((note) => note.id === id);
   
    if (index !== -1) {
      notes[index] = {
        ...notes[index],
        title,
        tags,
        body,
        updatedAt,
      };
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  };

  /*
   * Handler untuk menghapus notes
  */

  const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
   
    const index = notes.findIndex((note) => note.id === id);
   
    if (index !== -1) {
      notes.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil dihapus',
      });
      response.code(200);
      return response;
    }
   
   const response = h.response({
      status: 'fail',
      message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  };

module.exports = {
    addNotHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
};
