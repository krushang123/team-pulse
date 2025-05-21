import NewProjectDialog from "@/components/project/new-project-dialog"
import ProjectList from "@/components/project/project-list"

const HomePage = () => (
  <div>
    <div className='flex justify-between items-center mb-6'>
      <h1 className='text-2xl font-bold'>Projects</h1>

      <NewProjectDialog />
    </div>

    <ProjectList />
  </div>
)

export default HomePage
