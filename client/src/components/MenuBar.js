import React,{useState} from 'react'
import { Menu} from 'semantic-ui-react'
import { Link} from 'react-router-dom'

export default function MenuBar(){
  const [activeItem, setactiveItem] = useState('home')  

  const handleItemClick = (e, { name }) => setactiveItem( name )


    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to='/'
          />
          {/* <Menu.Item
            name='messages'
            active={activeItem === 'messages'}
            onClick={this.handleItemClick}
          /> */}
          <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to='/login'
          />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
              to='/register'
            />
          </Menu.Menu>
        </Menu>

        {/* <Segment>
          <img src='/images/wireframe/media-paragraph.png' />
        </Segment> */}
      </div>
    )
}