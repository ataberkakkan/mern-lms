import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, { data, isLoading, isSuccess, error }] =
    useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId);
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Error: Invalid Response from server.");
      }
    }

    if (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  }, [data, isSuccess, error]);

  return (
    <Button
      disabled={isLoading}
      onClick={purchaseCourseHandler}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Please Wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};
export default BuyCourseButton;
