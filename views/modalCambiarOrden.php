<div class="modal fade" id="modalOrden" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div style=" background: linear-gradient(#00448e, #001933); color:white;" class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold titulo" style="color: white;"></h4>
            </div>
            <div class="modal-body mx-3">
              <strong>Arrastra para acomodar el orden deseado:</strong><br>
              <form id="modalCambiarOrden" action="#" method="POST" enctype="multipart/form-data">
                <div class="form-group">
                  <div class="col-md-12 offset-md-0">
                    <div class="form-row mb-5">
                      <div class="col-md-12 mt-1">
                        <ul id="sortable" class="connectedSortable ordenLista text-center"></ul>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div class="modal-footer justify-content-center">
                <button type="submit" class="btn btn-outline-primary btn-modal btn-rounded btn_cambiar_orden">Cambiar</button>
                <button type="button" class="btn btn-outline-danger btn-modal btn-rounded btn_cancel" data-dismiss="modal">Cancelar</button>
              </div>
            </div>
        </div>
    </div>
</div>
