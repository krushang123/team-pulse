import ProjectDetail from "@/components/project/project-detail"

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>
}

const ProjectDetailPage = async (props: ProjectDetailPageProps) => {
  const { params } = props

  const { slug } = await params

  return <ProjectDetail slug={slug} />
}

export default ProjectDetailPage
