import React from 'react'

function viewService() {
  return (
            <div className="db">

                <Form id="form">
                    <h3>Thêm vé tại quầy</h3>
                    
                    <Form.Label>Tên vé</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Tên vé"
                        value={nameTicket}
                        onChange={e=>setNameTicket(e.target.value)}
                    />
                    </InputGroup>
                    
                    <Form.Label>Giá</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Giá"
                        value={price}
                        onChange={e=>setPrice(e.target.value)}
                    />
                    </InputGroup>

                <button onClick={(e)=>handleSubmit(e)} style={{paddingTop : '10px'}} className="btn btn-dark btn-lg btn-block">Submit</button>
                </Form>
            </div>
        );
}

export default viewService