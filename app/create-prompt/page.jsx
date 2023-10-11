import { getPromptDetails } from "apiService";
'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Form from '@components/Form';

const UpdatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [promptData, setPromptData] = useState({ prompt: '', tag: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (promptId) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const postData = await getPromptDetails(promptId);
          setPromptData(postData);
        } catch (error) {
          console.log(error);
          setErrorMessage('Failed to fetch prompt details');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: promptData.prompt,
          tag: promptData.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.log("Update failed");
      }
    } catch (error) {
      console.log(error);
      return <ErrorFallback />;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form
      type='Update'
      post={promptData}
      setPost={setPromptData}
      submitting={submitting}
      errorMessage={errorMessage}
    />
  );
};

export default UpdatePrompt;

