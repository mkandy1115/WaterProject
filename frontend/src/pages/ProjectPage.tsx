import { useState } from 'react'
import '../App.css'
import ProjectList from '../components/ProjectList'
import CategoryFilter from '../components/CategoryFilter'
import WelcomeBand from '../components/WelcomeBand'
import CartSummary from '../components/CartSummary'

function ProjectPage(){
      const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    return(
        <div className='container mt-4'>
          <div className='row bg-primary text-white'>
            <CartSummary />
            <WelcomeBand />
          </div>
          <div className='row'>
            <div className='col-md-3'>
              <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
            </div>
            <div className='col-md-9'>
              <ProjectList selectedCategories = {selectedCategories}/>
            </div>
          </div>
      </div>
    );
}

export default ProjectPage