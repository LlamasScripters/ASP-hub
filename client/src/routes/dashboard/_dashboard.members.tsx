import { createFileRoute } from '@tanstack/react-router'
import DashboardMembersPage from '@/features/dashboard/DashboardMembersPage'

export const Route = createFileRoute('/dashboard/_dashboard/members')({
    component: DashboardMembersRoute,
})

function DashboardMembersRoute() {
    return <DashboardMembersPage />
}
