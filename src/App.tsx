import { ChatIcon, CloseIcon, Icon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputLeftElement, InputRightElement, VStack } from '@chakra-ui/react';
import { AiOutlineSend } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';

import useSendMessage from './useSendMessage';
import ReceivingMessage from './ReceivingMessage';

const AlwaysScrollToBottom = () => {
  const elementRef: any = useRef(null);
  useEffect(() => elementRef?.current?.scrollIntoView());
  return <div ref={elementRef} />;
};

export default function App() {
  const [messages, setMessages] = useState([{ id: 1, content: 'Hi, how can i help you?', from: 'notme' }]);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    mutate: sendMessage,
    data: sendMessageRes,
    isLoading: receivingRes,
    reset: resetSendMessage,
  } = useSendMessage();

  useEffect(() => {
    if (sendMessageRes && !receivingRes) {
      const newId = messages.length + 1;
      const newMessage = {
        id: newId,
        content: sendMessageRes.Response,
        contentProductLink: sendMessageRes['Product link'],
        contentImageLink: sendMessageRes['Image link'],
        from: 'bot',
      };
      setMessages([...messages, newMessage]);
      resetSendMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivingRes, sendMessageRes]);

  const handleSendMessage = () => {
    if (receivingRes || !inputValue) {
      return;
    }

    sendMessage(inputValue);

    const newId = messages.length + 1;
    setMessages([...messages, { id: newId, content: inputValue, from: 'me' }]);
    setInputValue('');
  };

  return (
    <Box
      className={`wentilab-floating-chat enter ${isOpen ? 'expand' : ''}`}
      onClick={(event: any) => {
        event.stopPropagation();
        setIsOpen(true);
      }}
    >
      {!isOpen && <ChatIcon />}

      <Box className={`chat ${isOpen ? 'enter' : ''}`}>
        <Box flexShrink="0" pb="10px" display="flex" bg="transparent" alignItems="center">
          <span style={{ flexGrow: 1, flexShrink: 1, paddingLeft: '7px' }}>WentiLabs Assistant</span>

          <CloseIcon
            onClick={(event: any) => {
              event.stopPropagation();
              setIsOpen(false);
            }}
          />
        </Box>

        <Box p="10px" m="0" overflowY="scroll" overflowX="hidden" flexGrow="1" bg="transparent">
          {messages.map((message: any) => {
            if (message.from === 'me') {
              return (
                <VStack w="full" key={message.id} alignItems="end" justifyContent="end" mb="20px" pr="5px">
                  <Box minW="100px" bg="#E5E7FC" color="#4442B7" p="5px 16px" borderRadius="15px" maxW="250px">
                    {message.content}
                  </Box>
                </VStack>
              );
            }

            return (
              <VStack w="full" key={message.id} alignItems="start" mb="20px" pr="5px">
                <Box bg="white" color="black" p="5px 16px" borderRadius="15px" maxW="250px">
                  {message.content}
                </Box>

                {!!message.contentProductLink && (
                  <Box bg="white" p="5px 16px" borderRadius="15px" maxW="250px">
                    <img
                      src={message.contentImageLink}
                      alt="Product"
                      width="580"
                      height="580"
                      onClick={() => {
                        window.open(message.contentProductLink, '_blank', 'noopener,noreferrer');
                      }}
                      style={{ cursor: 'pointer' }}
                    />

                    <a
                      style={{ width: '100%', textAlign: 'center', display: 'block', marginTop: '8px', color: 'black' }}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={message.contentProductLink}
                    >
                      Click to see details
                    </a>
                  </Box>
                )}
              </VStack>
            );
          })}

          {receivingRes && <ReceivingMessage />}
          <AlwaysScrollToBottom />
        </Box>

        <Box w="full" mt="20px" color="black">
          <InputGroup w="full" bg="white" h="40px" borderRadius="30px" boxShadow="1px 1px 5px 0px rgba(0, 0, 0, 0.10)">
            <InputLeftElement h="40px" ml="4px">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.8" clipPath="url(#clip0_27_1244)">
                  <path
                    d="M18.1274 2.4049C15.6346 -0.0878466 11.5785 -0.0878466 9.08568 2.4049L1.33522 10.1552C-0.445182 11.9359 -0.445065 14.8331 1.33553 16.6137C2.22588 17.504 3.39503 17.9492 4.56464 17.9491C5.73394 17.9489 6.90364 17.5039 7.79387 16.6137L14.8982 9.50926C15.9666 8.44105 15.9668 6.70269 14.8983 5.63409C13.8299 4.56576 12.0914 4.5658 11.0232 5.63428L6.37731 10.28C6.02062 10.6367 6.02062 11.215 6.37723 11.5717C6.73399 11.9284 7.31219 11.9284 7.66895 11.5717L12.3149 6.92585C12.671 6.56972 13.2505 6.56972 13.6066 6.92574C13.9627 7.28195 13.9627 7.86132 13.6065 8.21746L6.50227 15.322C5.43383 16.3903 3.69554 16.3904 2.62717 15.3221C1.55885 14.2537 1.55873 12.5153 2.62694 11.4469L10.3774 3.69658C12.158 1.91615 15.0552 1.91607 16.8358 3.69666C17.6984 4.55916 18.1734 5.706 18.1734 6.92581C18.1734 8.14566 17.6984 9.29246 16.8357 10.155L9.08548 17.9055C8.7288 18.2622 8.7288 18.8405 9.08556 19.1972C9.26392 19.3756 9.49767 19.4647 9.73138 19.4647C9.96509 19.4647 10.1989 19.3755 10.3772 19.1972L18.1273 11.4468C19.335 10.2393 20 8.63371 20 6.92589C20.0001 5.21799 19.3351 3.61244 18.1274 2.4049Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_27_1244">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </InputLeftElement>

            <Input
              disabled={receivingRes}
              placeholder="Ask me anything"
              bg="white"
              h="40px"
              borderRadius="30px"
              border="none"
              mx="6px"
              value={inputValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)}
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              _focusVisible={{ border: 'none' }}
            />

            <InputRightElement h="40px" mr="4px">
              <Icon as={AiOutlineSend} onClick={handleSendMessage} fontSize="20px" />
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>
    </Box>
  );
}
