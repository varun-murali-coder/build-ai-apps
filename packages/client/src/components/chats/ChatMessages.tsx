import { useEffect, useRef } from 'react';
import Reactmarkdown from 'react-markdown';

export type ChatMessage = {
   content: string;
   role: 'user' | 'bot';
};
type Props = {
   messages: ChatMessage[];
};
const ChatMessages = ({ messages }: Props) => {
   const lastMessageRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);

   const onCopyMessage = (
      e: React.ClipboardEvent<HTMLParagraphElement>
   ): void => {
      const selection = window.getSelection()?.toString().trim();
      if (selection) {
         e.preventDefault();
         e.clipboardData.setData('text/plain', selection);
      }
   };
   return (
      <div className="flex flex-col gap-3">
         {messages.map((message, index) => (
            <div
               key={index}
               className={`px-3 py-1  rounded-xl ${
                  message.role === 'user'
                     ? 'bg-blue-600 text-white self-end'
                     : 'bg-gray-100 text-black self-start'
               }`}
               onCopy={onCopyMessage}
               ref={index === messages.length - 1 ? lastMessageRef : null}
            >
               <Reactmarkdown>{message.content}</Reactmarkdown>
            </div>
         ))}
      </div>
   );
};

export default ChatMessages;
