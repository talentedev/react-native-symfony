<?php

namespace App\Model;

use doctrine\GraphQLite\Annotations\Field;
use doctrine\GraphQLite\Annotations\Type;

/**
 * @Type
 */
class StripeInvoice
{
    /**
     * @var string
     */
    private $id;
    /**
     * @var int
     */
    private $amountInCents;
    /**
     * @var string
     */
    private $pdfLink;
    /**
     * @var \DateTimeImmutable
     */
    private $timestamp;

    /**
     * PromotionType constructor.
     * @param string $id
     * @param int $amountInCents
     * @param string $pdfLink
     * @param \DateTimeImmutable $timestamp
     */
    public function __construct(string $id, int $amountInCents, string $pdfLink, \DateTimeImmutable $timestamp)
    {
        $this->id = $id;
        $this->amountInCents = $amountInCents;
        $this->pdfLink = $pdfLink;
        $this->timestamp = $timestamp;
    }

    /**
     * @Field()
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @Field()
     * @return int
     */
    public function getAmountInCents(): int
    {
        return $this->amountInCents;
    }

    /**
     * @Field()
     * @return string
     */
    public function getPdfLink(): string
    {
        return $this->pdfLink;
    }

    /**
     * @Field()
     * @return \DateTimeImmutable
     */
    public function getTimestamp(): \DateTimeImmutable
    {
        return $this->timestamp;
    }
}
