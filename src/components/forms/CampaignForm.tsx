import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { parseEther } from "viem";
import { useState } from "react";
import { Campaign } from "../../types/campaign";
import { CampaignFactory, CampaignFactoryAddress } from "../../ABI/CampaignFactory";
import { useWriteContract } from "wagmi";
import { useToast } from "@chakra-ui/react";
export const CampaignForm = () => {
  const toaster = useToast();
  const { writeContractAsync } = useWriteContract();
  const [formData, setFormData] = useState<Campaign>({
    minimumContribution: "",
    deadline: "",
    name: "",
    description: "",
    imageUrl: "",
    targetAmount: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const createCampaign = writeContractAsync({
      abi: CampaignFactory,
      address: CampaignFactoryAddress,
      functionName: "createCampaign",
      args: [
        parseEther(formData.minimumContribution).toString(),
        parseInt((new Date(formData.deadline).getTime() / 1000).toFixed(0)),
        formData.name,
        formData.description,
        formData.imageUrl,
        parseEther(formData.targetAmount).toString(),
      ],
    });

    toaster.promise(createCampaign, {
      success: {
        title: "Successfully Created A New Campaign!",
      },
      error: {
        title: "Error while creating Campaign",
        description: "Something wrong with the upload",
      },
      loading: { title: "Creating...", description: "Please wait" },
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
     
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <FormControl isRequired>
            <FormLabel>Minimum Contribution Amount</FormLabel>
            <InputGroup>
              <Input
                name="minimumContribution"
                value={formData.minimumContribution}
                onChange={handleChange}
                type="number"
                step="0.001"
                min="0"
              />
              <InputRightAddon>ETH</InputRightAddon>
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Campaign Name</FormLabel>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Campaign Description</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              minH="150px"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Image URL</FormLabel>
            <Input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              type="url"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Deadline</FormLabel>
            <Input
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              type="date"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Target Amount</FormLabel>
            <InputGroup>
              <Input
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleChange}
                type="number"
                step="0.001"
                min="0"
              />
              <InputRightAddon>ETH</InputRightAddon>
            </InputGroup>
          </FormControl>

          <Button type="submit" colorScheme="teal" size="lg">
            Create
          </Button>
        </VStack>
      </form>
    </>
  );
};
