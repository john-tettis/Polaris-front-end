import {Offcanvas} from 'react-bootstrap'



export default function WidgetMenu({show,setShow,data,children}) {
  
    const handleClose = () => setShow(false);
    // document.getElementsByClassName('btn close')[0].onClick = ()=> handleClose()
  
    return (
      <>
  
        <div className={`widget-menu off-canvas off-canvas-left ${show ? 'show':''}`} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <h2>Astro-Report</h2> 
              </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {children}
          </Offcanvas.Body>
        </div>
      </>
    );
  }


  //this is not reacty at all. but react-bootstrap does not allow for the customization I need.
  //refactor this later.
 