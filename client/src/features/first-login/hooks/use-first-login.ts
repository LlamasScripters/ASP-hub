import { getLoggedInUserQueryOptions } from "@/features/users/users.config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
	type ApplicationData,
	type ApplicationWithDetails,
	type ProfileData,
	getFirstLoginStatusQueryOptions,
	getMembershipOptionsQueryOptions,
	getUserApplicationsQueryOptions,
} from "../first-login.config";
import { firstLoginService } from "../first-login.service";

export function useFirstLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	// Get current user data
	const { data: user } = useQuery(getLoggedInUserQueryOptions());

	// Get current first login status
	const {
		data: status,
		isLoading: isLoadingStatus,
		error: statusError,
	} = useQuery(getFirstLoginStatusQueryOptions());

	// Get membership options (sections/categories)
	const {
		data: membershipOptions,
		isLoading: isLoadingOptions,
		error: membershipError,
	} = useQuery(getMembershipOptionsQueryOptions());

	// Get user applications
	const { data: applications, isLoading: isLoadingApplications } = useQuery(
		getUserApplicationsQueryOptions(),
	) as { data: ApplicationWithDetails[] | undefined; isLoading: boolean };

	// Complete profile mutation
	const completeProfileMutation = useMutation({
		mutationFn: (profileData: ProfileData) =>
			firstLoginService.completeProfile(profileData),
		onSuccess: () => {
			toast.success("Profil complété avec succès !");
			// Invalidate status to refresh the current step
			queryClient.invalidateQueries({
				queryKey: ["first-login", "status"],
			});
			// Also invalidate user session to get updated data
			queryClient.invalidateQueries({
				queryKey: ["user", "me"],
			});
		},
		onError: (error) => {
			toast.error(
				error instanceof Error
					? error.message
					: "Erreur lors de la complétion du profil",
			);
		},
	});

	// Submit application mutation
	const submitApplicationMutation = useMutation({
		mutationFn: (applicationData: ApplicationData) =>
			firstLoginService.submitApplication(applicationData),
		onSuccess: () => {
			toast.success("Candidature soumise avec succès !");
			// Invalidate relevant queries
			queryClient.invalidateQueries({
				queryKey: ["first-login", "status"],
			});
			queryClient.invalidateQueries({
				queryKey: ["first-login", "applications"],
			});
		},
		onError: (error) => {
			toast.error(
				error instanceof Error
					? error.message
					: "Erreur lors de la soumission de la candidature",
			);
		},
	});

	// Update application mutation
	const updateApplicationMutation = useMutation({
		mutationFn: ({
			applicationId,
			applicationData,
		}: { applicationId: string; applicationData: ApplicationData }) =>
			firstLoginService.updateApplication(applicationId, applicationData),
		onSuccess: () => {
			toast.success("Candidature mise à jour avec succès !");
			// Invalidate relevant queries
			queryClient.invalidateQueries({
				queryKey: ["first-login", "status"],
			});
			queryClient.invalidateQueries({
				queryKey: ["first-login", "applications"],
			});
		},
		onError: (error) => {
			toast.error(
				error instanceof Error
					? error.message
					: "Erreur lors de la mise à jour de la candidature",
			);
		},
	});

	// Check if user needs first login flow
	const needsFirstLogin = status?.step !== "complete";

	// Get current step information
	const currentStep = status?.step || "profile";
	const canProceed = status?.canProceed ?? false;
	const nextAction = status?.nextAction || "";

	// Navigation helpers
	const redirectToFirstLogin = () => {
		// TODO: Create first-login routes
		navigate({ to: "/dashboard" }); // Temporary fallback
	};

	const redirectToDashboard = () => {
		navigate({ to: "/dashboard" });
	};

	return {
		// User data
		user,

		// Status data
		status,
		isLoadingStatus,
		statusError,
		needsFirstLogin,
		currentStep,
		canProceed,
		nextAction,

		// Membership options
		membershipOptions,
		isLoadingOptions,
		membershipError,

		// Applications
		applications,
		isLoadingApplications,

		// Mutations
		completeProfile: completeProfileMutation.mutate,
		isCompletingProfile: completeProfileMutation.isPending,
		submitApplication: submitApplicationMutation.mutate,
		isSubmittingApplication: submitApplicationMutation.isPending,
		updateApplication: updateApplicationMutation.mutate,
		isUpdatingApplication: updateApplicationMutation.isPending,

		// Navigation
		redirectToFirstLogin,
		redirectToDashboard,
	};
}
