import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export const Icons = {
  spinner: (props: React.ComponentProps<typeof Loader2>) => (
    <Loader2 {...props} className={cn("h-4 w-4 animate-spin", props.className)} />
  ),
} 