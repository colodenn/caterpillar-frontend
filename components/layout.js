import Header from '../components/header'

const Layout = (props) => ( 
    <>
        <Header />
        <main>
            <div className='container mx-auto px-4'>{props.children}</div>
            
        </main>
    </>
);

export default Layout;
