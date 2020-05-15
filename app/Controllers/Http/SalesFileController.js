'use strict';

const Sale = use('App/Models/Sale');
const File = use('App/Models/File');
const SalesFile = use('App/Models/SalesFile');

const Helpers = use('Helpers');

class SalesFileController {
  async store({ params, request, response }) {
    try {
      const sale = await Sale.find(params.id);

      if (!sale) {
        return response.status(401).send({
          error: { message: 'Anúncio não encontrado.' },
        });
      }

      if (!request.file('file')) return;

      const uploads = request.file('file', {
        types: ['image'],
        size: '2mb',
      });

      await uploads.moveAll(Helpers.tmpPath('uploads'), (upload) => ({
        name: `${Date.now()}.${upload.subtype}`,
      }));

      if (!uploads.movedAll()) {
        return uploads.errors();
      }

      await Promise.all(
        uploads.movedList().map(async (image) => {
          const file = await File.create({
            file: image.fileName,
            name: image.clientName,
            type: image.type,
            subtype: image.subtype,
          });

          await SalesFile.create({
            file_id: file.id,
            sale_id: sale.id,
          });
        })
      );

      await sale.load('images');

      return sale;
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Erro no upload dos arquivos.' },
      });
    }
  }

  async show({ params, response }) {
    try {
      const sale = await Sale.find(params.id);

      if (!sale) {
        return response.status(401).send({
          error: { message: 'Anúncio não encontrado.' },
        });
      }

      const images = await SalesFile.query()
        .where('sale_id', params.id)
        .with('file')
        .fetch();

      return images;
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Ops, erro interno.' },
      });
    }
  }
}

module.exports = SalesFileController;
