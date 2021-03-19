<?php

namespace App\Model;

use doctrine\GraphQLite\Annotations\Field;
use doctrine\GraphQLite\Annotations\Type;

/**
 * @Type
 */
class Notification
{
    /**
     * @var string
     */
    private $type;
    /**
     * @var string|null
     */
    private $businessName;
    /**
     * @var string|null
     */
    private $amount;
    /**
     * @var \DateTimeImmutable
     */
    private $timestamp;

    /**
     * PromotionType constructor.
     * @param string $type
     * @param \DateTimeImmutable $timestamp
     * @param string|null $businessName
     * @param string|null $amount
     */
    public function __construct(string $type, \DateTimeImmutable $timestamp, ?string $businessName = null, ?string $amount = null)
    {
        $this->type = $type;
        $this->timestamp = $timestamp;
        $this->businessName = $businessName;
        $this->amount = $amount;
    }

    /**
     * @Field()
     * @return string|null
     */
    public function getAmount(): ?string
    {
        return $this->amount;
    }

    /**
     * @Field()
     * @return string|null
     */
    public function getBusinessName(): ?string
    {
        return $this->businessName;
    }

    /**
     * @Field()
     * @return \DateTimeImmutable
     */
    public function getTimestamp(): \DateTimeImmutable
    {
        return $this->timestamp;
    }

    /**
     * @Field()
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }
}
