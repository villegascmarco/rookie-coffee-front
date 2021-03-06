import React, { useState, useEffect } from "react";
import "../estilos/CardProducto.css";

const CardProducto = ({ producto, agregar }) => {



  return (
    <div>
      <div class="wsk-cp-product">
        <div class="wsk-cp-img">
          <img
            src={producto.foto}
            alt="Product"
            class="img-responsive"
          />
        </div>
        <div class="wsk-cp-text">
            <div class="title-product">
              <p>{producto.nombre}</p>
            </div>
            <div class="description-prod">
              <p>{producto.descripcion}</p>
            </div>
            <div class="wcf-right mb-3">
              {/* BOTON DE AGREGAR */}
              <button
                type="button"
                class="btn btn-success boton_agregar"
                data-toggle="modal"
                data-target="#agregar"
                value="true"
                onClick={() => agregar(producto)}
              >
                Agregar
                <i class="fa fa-plus-square ml-2"></i>
              </button>
            </div>
            <div class="card-footer">
              <div class="wcf-left">
                <span class="price">${producto.precio} MXN</span>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CardProducto;
