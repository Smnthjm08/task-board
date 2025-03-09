import { Header } from "./header";
import { BackButton } from "./back-button";
import {
  Card,
  CardFooter,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

export const ErrorCard = () => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label="Ooops! Something went wrong" />
            </CardHeader>
            <CardFooter>
                <BackButton label="Back to login" href="/auth/login" />
            </CardFooter>
        </Card>
    )
}