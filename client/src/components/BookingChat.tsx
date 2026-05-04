import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Send, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

interface BookingChatProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SERVICES = [
  { id: 'corte', name: 'Corte de Cabelo', duration: '30 min' },
  { id: 'barba', name: 'Barba na Régua', duration: '20 min' },
  { id: 'combo', name: 'Corte + Barba', duration: '50 min' },
  { id: 'hidratacao', name: 'Hidratação', duration: '25 min' },
];

const AVAILABLE_HOURS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];

type ConversationStep = 'greeting' | 'service' | 'date' | 'time' | 'confirmation' | 'completed';

export default function BookingChat({ isOpen = false, onClose }: BookingChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState<ConversationStep>('greeting');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isOpen_, setIsOpen_] = useState(isOpen);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen_ && messages.length === 0) {
      addAssistantMessage('Olá! 👋 Bem-vindo à Barbearia Coxipó. Como posso ajudá-lo hoje?');
    }
  }, [isOpen_]);

  const addMessage = (text: string, type: 'user' | 'assistant' = 'user') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addAssistantMessage = (text: string) => {
    addMessage(text, 'assistant');
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue);
    const userInput = inputValue.toLowerCase();
    setInputValue('');

    // Simulate assistant response based on conversation step
    setTimeout(() => {
      if (step === 'greeting') {
        if (userInput.includes('agendar') || userInput.includes('marcar')) {
          setStep('service');
          addAssistantMessage('Perfeito! Qual serviço você deseja? 💈\n\n1️⃣ Corte de Cabelo (30 min)\n2️⃣ Barba na Régua (20 min)\n3️⃣ Corte + Barba (50 min)\n4️⃣ Hidratação (25 min)\n\nDigite o número ou o nome do serviço.');
        } else {
          addAssistantMessage('Você gostaria de agendar um horário conosco? 😊');
        }
      } else if (step === 'service') {
        const serviceMatch = SERVICES.find(
          (s) =>
            userInput.includes(s.id) ||
            userInput.includes(s.name.toLowerCase()) ||
            userInput === (SERVICES.indexOf(s) + 1).toString()
        );

        if (serviceMatch) {
          setSelectedService(serviceMatch.name);
          setStep('date');
          addAssistantMessage(
            `Excelente! Você escolheu ${serviceMatch.name}. 🎯\n\nQual data você prefere? (ex: amanhã, segunda, 05/05)`
          );
        } else {
          addAssistantMessage('Desculpe, não entendi. Poderia escolher um dos serviços acima? 😊');
        }
      } else if (step === 'date') {
        setSelectedDate(userInput);
        setStep('time');
        addAssistantMessage(
          `Ótimo! Para ${userInput}, qual horário você prefere?\n\n${AVAILABLE_HOURS.map((h, i) => `${i % 3 === 0 ? '\n' : ''}${h}  `).join('')}`
        );
      } else if (step === 'time') {
        const timeMatch = AVAILABLE_HOURS.find((h) => userInput.includes(h));
        if (timeMatch) {
          setSelectedTime(timeMatch);
          setStep('confirmation');
          addAssistantMessage(
            `Perfeito! Deixe-me confirmar seu agendamento:\n\n📋 Serviço: ${selectedService}\n📅 Data: ${selectedDate}\n🕐 Horário: ${timeMatch}\n\nTudo certo? (sim/não)`
          );
        } else {
          addAssistantMessage('Desculpe, não encontrei esse horário. Poderia escolher um dos disponíveis? ⏰');
        }
      } else if (step === 'confirmation') {
        if (userInput.includes('sim') || userInput.includes('confirma')) {
          setStep('completed');
          addAssistantMessage(
            `🎉 Agendamento confirmado!\n\nSeu horário foi marcado com sucesso. Você receberá uma confirmação por WhatsApp.\n\nObrigado por escolher a Barbearia Coxipó! 💈✨`
          );
        } else if (userInput.includes('não') || userInput.includes('cancelar')) {
          setStep('service');
          addAssistantMessage('Sem problema! Vamos começar de novo. Qual serviço você deseja? 😊');
        } else {
          addAssistantMessage('Poderia responder com "sim" ou "não"? 😊');
        }
      }
    }, 500);
  };

  const handleQuickSelect = (service: string) => {
    addMessage(service);
    setSelectedService(service);
    setStep('date');
    setTimeout(() => {
      addAssistantMessage(`Ótimo! Você escolheu ${service}. 🎯\n\nQual data você prefere? (ex: amanhã, segunda, 05/05)`);
    }, 300);
  };

  if (!isOpen_) {
    return (
      <button
        onClick={() => setIsOpen_(true)}
        className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110"
        title="Abrir chat de agendamento"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-lg shadow-2xl flex flex-col h-[600px] max-h-[80vh]">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">Barbearia Coxipó</h3>
          <p className="text-xs opacity-90">Assistente de Agendamento</p>
        </div>
        <button
          onClick={() => {
            setIsOpen_(false);
            onClose?.();
          }}
          className="hover:opacity-80 transition-opacity"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-secondary text-foreground rounded-bl-none'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {step === 'service' && messages.length > 1 && (
        <div className="px-4 py-2 bg-secondary border-t border-border grid grid-cols-2 gap-2">
          {SERVICES.map((service) => (
            <button
              key={service.id}
              onClick={() => handleQuickSelect(service.name)}
              className="text-xs bg-primary text-primary-foreground p-2 rounded hover:opacity-90 transition-opacity"
            >
              {service.name}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border p-3 bg-card flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-secondary text-foreground px-3 py-2 rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
        <button
          onClick={handleSendMessage}
          className="bg-primary text-primary-foreground p-2 rounded hover:opacity-90 transition-opacity"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
