import React from "react";
import "../estilos/CardProducto.css";

const CardProducto = ({producto, setProductoSel, productoSel}) => {
  return (
    <div>
      <div class="wsk-cp-product">
        <div class="wsk-cp-img">
          <img
            src="https://lh3.googleusercontent.com/proxy/IwIAFtJzcT8WFJxaLu-PmNE94IlIMGz6QkctTlpXQAoaukDCM33KymgJnPITiNUzWQnbAmKP4vFPm4U2igKAOgopIfAxsp09jn8RbLxLhn_qaA"
            alt="Product"
            class="img-responsive"
          />
        </div>
        <div class="wsk-cp-text">

          
          
          <div class="title-product">
            <p>{producto.nombre}</p>
          </div>
          <div class="description-prod">
            <p>
              {producto.descripcion}
            </p>
          </div>
          <div class="wcf-right mb-3">
              {/* BOTON DE AGREGAR */}
              <button
                type="button"
                class="btn btn-success boton_agregar"
                data-toggle="modal"
                data-target="#agregar"
                value="true"
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
