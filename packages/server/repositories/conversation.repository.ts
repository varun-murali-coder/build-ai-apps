const conversations = new Map<string, string[]>();

export function getConversation(conversationId: string): string[] {
   let history = conversations.get(conversationId);

   if (!history) {
      history = [];
      conversations.set(conversationId, history);
   }

   return history;
}

export function saveConversation(
   conversationId: string,
   history: string[]
): void {
   conversations.set(conversationId, history);
}
