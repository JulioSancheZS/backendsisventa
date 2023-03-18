import { Request, Response } from 'express'
import Categoria from '../models/categoria';

//Listado de categorias
export const getCategoria = async (res: Request, response: Response) => {

    //Listado 
  const listaCategoria = await Categoria.findAll();

  response.json(listaCategoria)

  /*
      response.json({
        msg: "Listado de categoria"
    })
  */

}

//Categoria por id
export const getCategoriaPorId = async (red: Request, response: Response) => {

    //destructurar 
  const { id } = red.params;
   
  const categoria = await Categoria.findByPk(id)

  if(categoria){
    response.json(categoria);
  }else{
    response.status(404).json({
        msg: `No existe la categoria con el ID ${id}`
    })
  }
   
}

//Desactivar/Eliminar de categorias por id
export const deleteCategoria = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id)
    try {
      // Buscamos la categoría por su ID
      const categoria = await Categoria.findByPk(id);
  
      if (!categoria) {
        return res.status(404).json({
          msg: `No existe la categoria con el Id ${id}`
        });
      }
  
      // Actualizamos el campo activo a false
      await categoria.update({ activo: false });
  
      res.json({
        msg: 'La categoria fue desactivada con exito',
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Upps, ocurrio un error al desactivar la categoria',
      });
    }
  };
  

//Agregar de categorias por id
export const postCategoria = async(res: Request, response: Response) => {

   //destructurar 
  const { body } = res;
  //Agregar se hace con el create y le pasamos el body
  try {
    await Categoria.create(body);
    //Enviamos mensaje
    response.json({
      msg: 'La categoria fue agregada con exito',
    })
  } catch (error) {
    console.log(error);
    //Enviamos mensaje
    response.json({
      msg: 'Upps, ocurrio un error',
    })
  }
}

//Agregar de categorias por id
export const updateCategoria = async (res: Request, response: Response) => {

  //destructurar 
  const { body } = res;
  const { id } = res.params; //obtenemos el id
  const categoria = await Categoria.findByPk(id);

  try {
    if (categoria) {
      await categoria.update(body)
      response.json({
        msg: 'El categoria fue actualizado con exito',
      })
    } else {
  
      response.status(404).json({
        msg: `No existe un categoria con el Id ${id}`
      })
  
    }
  } catch (error) {
    console.log(error);
    //Enviamos mensaje
    response.json({
      msg: 'Upps, ocurrio un error al actualizar',
    })
  }
}



