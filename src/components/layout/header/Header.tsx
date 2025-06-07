import Nav from '@/components/layout/nav/Nav'
import '@/styles/header.scss'

export default function Header() {

  return (
    <header className="sticky-header">
        <div className="container">
            <Nav />
        </div>
    </header>
  )
}
