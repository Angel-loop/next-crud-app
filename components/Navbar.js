import Link from 'next/link'
import { Menu } from 'semantic-ui-react'

export default function Navbar() {
  return (
    <Menu>
        <Menu.Item>
            <Link href='/'>Home</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href='/tasks/new'>New Task</Link>
        </Menu.Item>
    </Menu>
  )
}
