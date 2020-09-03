import React from "react"

export default function ModalBasic(){
    return (
        <div className="modal fade" id="connect" tabIndex="-1" role="dialog" aria-labelledby="connect" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Connect</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button> 
                    </div>
                    <div className="modal-body">
                        {/* <iframe id="connect-iframe" className="" src="https://cms.victorychur.ch/form/global-contact-form/?origin=smallgroups" style="min-height: 600px;" width="100%" frameborder="0"></iframe> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
