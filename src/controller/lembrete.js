const Lembrete = require('../model/lembrete');
  const Status = require('http-status');
   
  exports.buscarUm = (request, response, next) => {
      const id = request.params.id;
   
      Lembrete.findById(id).then((lembrete) => {
          if (lembrete) {
              response.send(lembrete);
          } else {
              response.status(Status.NOT_FOUND).send();
          }
      }).catch((error) => next(error));
  };
   
  exports.buscarTodos = (request, response, next) => {
      let limite = parseInt(request.query.limite || 0);
      let pagina = parseInt(request.query.pagina || 0);
   
      if (!Number.isInteger(limite) || !Number.isInteger(pagina)) {
          response.status(Status.BAD_REQUEST).send();
      }
   
      const ITENS_POR_PAGINA = 10;
   
      limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
      pagina = pagina <= 0 ? 0 : pagina * limite;
   
      Lembrete.findAll({ limit: limite, offset: pagina }).then((lembretes) => {
          if (lembretes && lembretes.length) {
              response.send(lembretes);
          } else {
              response.status(Status.NOT_FOUND).send();
          }
      }).catch((error) => next(error));
  };
   
  exports.criar = (request, response, next) => {
      const conteudo = request.body.conteudo;
     
   
      Lembrete.create({
          conteudo: conteudo,
      }).then(() => {
          response.status(Status.CREATED).send();
      }).catch((error) => next(error));
  };
   
  exports.atualizar = (request, response, next) => {
      const id = request.params.id;
   
      const conteudo = request.body.conteudo;
   
      Lembrete.findById(id).then((lembrete) => {
          if (lembrete) {
              Lembrete.update({
                  conteudo: conteudo,
                  
              }, { where: { id: id } }).then(() => {
                  response.send();
              }).catch((error) => next(error));
          } else {
              response.status(Status.NOT_FOUND).send();
          }
      }).catch((error) => next(error));
  };
   
  exports.excluir = (request, response, next) => {
      const id = request.params.id;
   
      Lembrete.findById(id).then((lembrete) => {
          if (lembrete) {
              Lembrete.destroy({
                  where: { id: id }
              }).then(() => {
                  response.send();
              }).catch((error) => next(error));
          } else {
              response.status(Status.NOT_FOUND).send();
          }
      }).catch((error) => next(error));
  };