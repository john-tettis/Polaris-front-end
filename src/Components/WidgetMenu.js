import {Offcanvas} from 'react-bootstrap'



export default function WidgetMenu({show,setShow,data,children}) {
  
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);
    const button = show ? <button className='btn-close' onClick={handleClose}></button>:<button className='btn' onClick={handleOpen}>Launch Report</button>
    return (
      <>
  
        <div className={`off-canvas off-canvas-left ${show ? 'show':''}`} >
          <div className='mobile-launcher'> {button}</div>
          <Offcanvas.Header  onHide={handleClose}>
            
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
 