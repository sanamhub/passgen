import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown, ChevronRight, Code, Copy, Check } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

const ApiSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedItems, setCopiedItems] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  
  // Use the live URL for examples
  const baseUrl = "https://passgenfly.netlify.app";
  const apiPath = "/api/generate";
  const apiUrl = `${baseUrl}${apiPath}`;
  
  // Example for 'all' character mode
  const exampleQueryParamsAll = new URLSearchParams({
    length: "16",
    characterMode: "all",
    uppercase: "true",
    lowercase: "true",
    numbers: "true", 
    symbols: "true"
  }).toString();
  
  // Example for 'easyToSay' character mode
  const exampleQueryParamsEasyToSay = new URLSearchParams({
    length: "12",
    characterMode: "easyToSay"
  }).toString();

  // Initialize Prism syntax highlighting when the section is opened
  useEffect(() => {
    if (isOpen) {
      Prism.highlightAll();
    }
  }, [isOpen]);

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => ({ ...prev, [itemId]: true }));
      toast({
        title: "Copied to clipboard",
        description: "The text has been copied to your clipboard.",
      });
      setTimeout(() => {
        setCopiedItems(prev => ({ ...prev, [itemId]: false }));
      }, 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying manually.",
        variant: "destructive",
      });
    }
  };
  
  // Example response JSON for syntax highlighting
  const responseExample = `{
  "password": "X4$9aB!pR2@kL7",
  "strength": {
    "score": 85,
    "label": "Strong"
  },
  "options": {
    "length": 16,
    "characterMode": "all",
    "uppercase": true,
    "lowercase": true,
    "numbers": true,
    "symbols": true
  }
}`;

  // Example response for easyToSay mode
  const responseExampleEasyToSay = `{
  "password": "bapoludefi",
  "strength": {
    "score": 75,
    "label": "Good"
  },
  "options": {
    "length": 12,
    "characterMode": "easyToSay",
    "uppercase": false,
    "lowercase": true,
    "numbers": false,
    "symbols": false
  }
}`;
  
  return (
    <Card className="p-4 mt-4 border bg-card text-card-foreground">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <div className="flex items-center justify-between">
          <CollapsibleTrigger className="flex items-center w-full text-left font-medium">
            {isOpen ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 mr-2" />}
            <div className="flex items-center">
              <Code className="h-4 w-4 mr-2" />
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PassGenFly API
              </span>
              <Badge variant="default" className="ml-2 bg-green-500 hover:bg-green-600">API</Badge>
            </div>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="pt-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Password Generation API</h3>
              <p className="text-sm text-muted-foreground mb-2">
                This public API allows you to generate secure passwords with customizable options.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Endpoint</h4>
              <div className="relative group">
                <pre className="line-numbers language-markup rounded-md overflow-x-auto bg-muted/50 p-4">
                  <code className="language-markup whitespace-nowrap">{`GET ${apiUrl}`}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => copyToClipboard(`GET ${apiUrl}`, 'endpoint')}
                >
                  {copiedItems['endpoint'] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Query Parameters</h4>
              <ul className="text-sm space-y-2">
                <li><code className="bg-muted/50 px-1.5 py-0.5 rounded">length</code>: Password length (number, default: 12)</li>
                <li><code className="bg-muted/50 px-1.5 py-0.5 rounded">characterMode</code>: Character set mode ("all", "easyToSay", or "easyToRead", default: "all")</li>
                <li className="ml-4">When <code className="bg-muted/50 px-1.5 py-0.5 rounded">characterMode="all"</code>, you can also use:</li>
                <li className="ml-8"><code className="bg-muted/50 px-1.5 py-0.5 rounded">uppercase</code>: Include uppercase letters (boolean, default: true)</li>
                <li className="ml-8"><code className="bg-muted/50 px-1.5 py-0.5 rounded">lowercase</code>: Include lowercase letters (boolean, default: true)</li>
                <li className="ml-8"><code className="bg-muted/50 px-1.5 py-0.5 rounded">numbers</code>: Include numbers (boolean, default: true)</li>
                <li className="ml-8"><code className="bg-muted/50 px-1.5 py-0.5 rounded">symbols</code>: Include symbols (boolean, default: true)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Examples</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm mb-1">Default password (no parameters):</p>
                  <div className="relative group">
                    <pre className="line-numbers language-markup rounded-md overflow-x-auto bg-muted/50 p-4">
                      <code className="language-markup whitespace-nowrap">{apiUrl}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => copyToClipboard(apiUrl, 'default')}
                    >
                      {copiedItems['default'] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm mb-1">With "all" character mode:</p>
                  <div className="relative group">
                    <pre className="line-numbers language-markup rounded-md overflow-x-auto bg-muted/50 p-4">
                      <code className="language-markup whitespace-nowrap">{`${apiUrl}?${exampleQueryParamsAll}`}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => copyToClipboard(`${apiUrl}?${exampleQueryParamsAll}`, 'all')}
                    >
                      {copiedItems['all'] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm mb-1">With "easyToSay" character mode:</p>
                  <div className="relative group">
                    <pre className="line-numbers language-markup rounded-md overflow-x-auto bg-muted/50 p-4">
                      <code className="language-markup whitespace-nowrap">{`${apiUrl}?${exampleQueryParamsEasyToSay}`}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => copyToClipboard(`${apiUrl}?${exampleQueryParamsEasyToSay}`, 'easyToSay')}
                    >
                      {copiedItems['easyToSay'] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Response Format</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm mb-1">For "all" character mode:</p>
                  <div className="relative group">
                    <pre className="line-numbers language-json rounded-md overflow-x-auto bg-muted/50 p-4">
                      <code className="language-json whitespace-nowrap">{responseExample}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => copyToClipboard(responseExample, 'responseAll')}
                    >
                      {copiedItems['responseAll'] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm mb-1">For "easyToSay" character mode:</p>
                  <div className="relative group">
                    <pre className="line-numbers language-json rounded-md overflow-x-auto bg-muted/50 p-4">
                      <code className="language-json whitespace-nowrap">{responseExampleEasyToSay}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => copyToClipboard(responseExampleEasyToSay, 'responseEasyToSay')}
                    >
                      {copiedItems['responseEasyToSay'] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <h4 className="font-medium mb-1 text-blue-800 dark:text-blue-300">API Status</h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                This API is available for public use. Feel free to integrate it into your applications.
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-400 mt-2">
                <strong>Live API:</strong> <code className="bg-blue-100 dark:bg-blue-800 px-1.5 py-0.5 rounded">https://passgenfly.netlify.app/api/generate</code>
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                <strong>Local Development:</strong> <code className="bg-blue-100 dark:bg-blue-800 px-1.5 py-0.5 rounded">http://localhost:4174/api/generate</code> (API server)
                <br />
                <code className="bg-blue-100 dark:bg-blue-800 px-1.5 py-0.5 rounded mt-1 inline-block">http://localhost:4176</code> (Development server)
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default ApiSection; 