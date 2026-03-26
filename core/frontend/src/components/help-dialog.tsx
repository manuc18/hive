import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface HelpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>SDK Onboarding Help</DialogTitle>
          <DialogDescription>
            Get started with the Hive SDK and learn how to integrate it into your projects.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Start</h3>
            <div className="space-y-2 text-sm">
              <p>1. Install the SDK:</p>
              <code className="block bg-muted p-2 rounded text-xs">
                pip install hive-sdk
              </code>
              <p>2. Initialize your agent:</p>
              <code className="block bg-muted p-2 rounded text-xs">
                from hive import Agent<br/>
                agent = Agent(name="my-agent")
              </code>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Key Features</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Multi-agent orchestration</li>
              <li>Real-time monitoring and analytics</li>
              <li>Plugin system for extensibility</li>
              <li>Built-in security and authentication</li>
              <li>RESTful API for integrations</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Resources</h3>
            <div className="space-y-2 text-sm">
              <p>
                <a href="#" className="text-primary hover:underline">
                  📚 Documentation
                </a>
                {' '} - Complete API reference and guides
              </p>
              <p>
                <a href="#" className="text-primary hover:underline">
                  💬 Community Forum
                </a>
                {' '} - Get help from the community
              </p>
              <p>
                <a href="#" className="text-primary hover:underline">
                  🐛 Issue Tracker
                </a>
                {' '} - Report bugs and request features
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground">
              Need more help? Contact our support team at{' '}
              <a href="mailto:support@hive.ai" className="text-primary hover:underline">
                support@hive.ai
              </a>
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}