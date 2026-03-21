import {useState, useEffect} from 'react';
import type {Project} from '../types/Project'
import { useNavigate } from 'react-router-dom';

function ProjectList({selectedCategories}:{selectedCategories: string[]}){

    const [projects, setProjects] = useState<Project[]>([]);
    const [pageSize, setPageSize] = useState<number>(10)
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        setPageNum(1);
    }, [selectedCategories]);

    useEffect(()=>{
        const fetchProjects = async () =>{

const categoryParams = selectedCategories.map((cat)=>`projectTypes=${encodeURIComponent(cat)}`).join('&');

            const response = await fetch(`https://localhost:5000/api/Water/AllProjects?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}`: ''}`);
            const data = await response.json();
            setProjects(data.projects);
            setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
        }

        fetchProjects();
    }, [pageSize, pageNum, selectedCategories]);

    return (
        <>
            <br />
            {projects.map((p)=>
            <div key={p.projectId} id="projectCard" className="card">
                <h3 className='card-title'>{p.projectName}</h3>
                <div className='card-body'>
                    <ul className='list-unstyled'>
                        <li><strong>Project Type:</strong> {p.projectType}</li>
                        <li><strong>Regional Program:</strong> {p.projectRegionalProgram}</li>
                        <li><strong>Impact: </strong> {p.projectImpact} Individuals Served</li>
                        <li><strong>Project Phase: </strong>{p.projectPhase}</li>
                        <li><strong>Project Status: </strong> {p.projectFunctionalityStatus}</li>
                    </ul>
                </div>
                <button className='btn btn-success' onClick={() => navigate(`/donate/${p.projectName}/${p.projectId}`) }>Donate</button>
                
            </div>
            )}

            <br />
            

            <button disabled={pageNum === 1} onClick={()=> setPageNum(pageNum -1)}>Previous</button>

            {[...Array(totalPages)].map((_, i)=>(
                    <button key={i + 1} onClick={()=> setPageNum(i +1)} disabled={pageNum=== (i+1)}>
                        {i + 1}
                    </button>
                ))}

            <button disabled={pageNum === totalPages} onClick={()=> setPageNum(pageNum + 1)}>Next</button>

            <br />
            <label>
                Results per page:
                <select value={pageSize} onChange={(p)=> 
                {
                    setPageSize(Number(p.target.value))
                    setPageNum(1);
                }}>
                    <option value = "5">5</option>
                    <option value = "10">10</option>
                    <option value = "20">20</option>
                </select>
            </label>


        </>
    );
}

export default ProjectList
